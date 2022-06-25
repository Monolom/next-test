import LinkButton from "../components/LinkButton";
import { useRouter } from "next/router";
import { getLastPage } from "../helpersJs/index";
const selectNumberPage = [
  { text: "5 записей", id: 5 },
  { text: "10 записей", id: 10 },
  { text: "15 записей", id: 15 },
  { text: "20 записей", id: 20 },
];

const selectFilter = [
  { text: "сначало новые", id: "start" },
  { text: "сначало старые", id: "end" },
];

const Pagination = ({ data }) => {
  const { page, number, count, filter } = data;
  const router = useRouter();
  const getPaginationArr = (page, tabsNumber) => {
    let endTabsBlock;
    const writeArr = (number) => {
      const max = number;
      const arr = [];
      for (let i = 0; i < tabsNumber; i++) {
        arr.push(String(max - i));
      }
      return arr.reverse();
    };

    if (page + tabsNumber > lastPage) {
      return writeArr(lastPage);
    }
    if (page <= 0) {
      return writeArr(tabsNumber);
    }

    for (let i = page; ; i++) {
      if (i % tabsNumber == 0) {
        endTabsBlock = i;
        return writeArr(endTabsBlock);
      }
    }
  };
  const lastPage = getLastPage(count, number);
  const arrTabs = getPaginationArr(page + 1, 20);
  const arrTabsMobile = getPaginationArr(page + 1, 5);
  const submitNumberPage = ({ target }) => {
    const lastPage = getLastPage(count, target.value);
    let pageNumber = page;
    if (lastPage < page) {
      pageNumber = lastPage - 1;
    }
    router.push(
      `/content/${pageNumber}?number=${target.value}&filter=${filter}`
    );
  };

  const submitFilter = ({ target }) => {
    router.push(`/content/${page}?number=${number}&filter=${target.value}`);
  };

  return (
    <div className="pagination-wraper">
      <div className="pagination-head">
        <div className="pagination-head__item">
          <span className="span">{`Найдено: ${count}`}</span>
          <div className="select-wrapper">
            <span className="span">Показать на странице по: </span>{" "}
            <select value={number} onChange={(e) => submitNumberPage(e)}>
              {selectNumberPage.map((item) => (
                <option key={`key${item.id}`} value={item.id}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pagination-head__item">
          <div className="select-wrapper">
            <span className="span">Сортировать: </span>{" "}
            <select value={filter} onChange={(e) => submitFilter(e)}>
              {selectFilter.map((item) => (
                <option key={`key${item.id}`} value={item.id}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="pagination-bottom">
        <div className="pagination-bottom-wrapper">
          <div className="nav-section">
            <LinkButton
              disabled={page === 0}
              text={"Первая"}
              href={`/content/${0}?number=${number}&filter=${filter}`}
            ></LinkButton>
            <LinkButton
              disabled={page < arrTabs.length}
              text={"<<"}
              href={`/content/${
                +arrTabs[0] - 2
              }?number=${number}&filter=${filter}`}
            ></LinkButton>
            <LinkButton
              disabled={0 === page}
              text={"<"}
              href={`/content/${page - 1}?number=${number}&filter=${filter}`}
            ></LinkButton>
          </div>
          <div className="page-link-wrapper">
            {arrTabs.map((item, id) => (
              <LinkButton
                key={item + id}
                disabled={item == page + 1}
                active={item == page + 1}
                text={item}
                href={`/content/${item - 1}?number=${number}&filter=${filter}`}
              ></LinkButton>
            ))}
          </div>
          <div className="page-link-wrapper mobile">
            {arrTabsMobile.map((item, id) => (
              <LinkButton
                key={item + id}
                disabled={item == page + 1}
                active={item == page + 1}
                text={item}
                href={`/content/${item - 1}?number=${number}&filter=${filter}`}
              ></LinkButton>
            ))}
          </div>
          <div className="nav-section">
            <LinkButton
              disabled={lastPage == page + 1}
              text={">"}
              href={`/content/${page + 1}?number=${number}&filter=${filter}`}
            ></LinkButton>
            <LinkButton
              disabled={arrTabs.includes(String(lastPage))}
              text={">>"}
              href={`/content/${+arrTabs.at(
                -1
              )}?number=${number}&filter=${filter}`}
            ></LinkButton>
            <LinkButton
              disabled={page === lastPage - 1}
              text={"Последняя"}
              href={`/content/${
                lastPage - 1
              }?number=${number}&filter=${filter}`}
            ></LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
