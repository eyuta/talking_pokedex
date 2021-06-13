import "../styles/globals.css";

import { AppProps } from "next/app";

// Do this at the root of your application
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
