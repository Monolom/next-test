import "../styles/global.scss";
import { AppWrapper } from "../context/Context";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
