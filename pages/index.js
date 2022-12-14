import MainContainer from '../components/MainContainer';
import { parseCookies } from '../helpersJs/index';

const Index = ({ data }) => {
    return <MainContainer email={data.email}></MainContainer>;
};

export async function getServerSideProps({ query, req }) {
    //main branch
    const { number, filter, id } = query;
    const cookie = parseCookies(req);
    const cookieData =
        'userData' in cookie ? await JSON.parse(cookie.userData) : false;
    if (cookieData) {
        if (id) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/content/${id}?number=${number}&filter=${filter}`,
                },
            };
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: `/content/0?number=10&filter=start`,
                },
            };
        }
    } else {
        return {
            props: {
                data: { email: false },
            },
        };
    }
}
export default Index;
