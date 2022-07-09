import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'
import { ChannelContextProvider } from "./context/ChannelContext";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ChannelContextProvider>
        <App />
      </ChannelContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
