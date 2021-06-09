import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { AppProps } from "next/app";

// Do this at the root of your application
function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
