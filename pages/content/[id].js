import MainContainer from "../../components/MainContainer";
import { refreshLogin, loadContent, loadCounter } from "../../fetch/index";
import { parseCookies } from "../../helpersJs/index";
import { Card } from "@blueprintjs/core";
import Pagination from "../../components/Pagination";
import { getReversePage } from "../../helpersJs/index";

const Index = ({ data }) => {
  const { filter } = data;
  const renderSlides = (cards, filter) => {
    const filterArr = filter === "start" ? cards : cards.reverse();
    return filterArr.map((item) => (
      <Card className="card" key={item._id}>
        <h5>{item.name}</h5>
        <p>{item.category}</p>
      </Card>
    ));
  };
  return (
    <MainContainer email={data.email}>
      {!data.cards ? null : (
        <div className="page-wrapper">
          <div className="content-wrapper">
            {!data.cards ? null : renderSlides(data.cards, filter)}
          </div>
          <Pagination data={data}></Pagination>
        </div>
      )}
    </MainContainer>
  );
};

export async function getServerSideProps({ req, query }) {
  const { number, filter, id } = query;

  let filterPage = id;
  const cookie = parseCookies(req);

  const cookieData =
    "userData" in cookie ? await JSON.parse(cookie.userData) : false;
  if (cookieData) {
    const { email, refreshToken } = cookieData;
    const securityToken = refreshToken
      ? await refreshLogin(refreshToken)
      : null;
    const { count } = await loadCounter(securityToken);
    filterPage =
      filter === "start"
        ? filterPage
        : getReversePage(count, number, filterPage);
    const cards = await loadContent(securityToken, filterPage, number);

    return {
      props: {
        data: {
          count: count,
          cards: cards,
          filter: filter,
          number: +number,
          page: +id,
          email,
        },
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}
export default Index;
