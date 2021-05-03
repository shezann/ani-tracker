import React from "react";
import App from "./components/App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <GeistProvider>
      <CssBaseline>
        <App />
      </CssBaseline>
    </GeistProvider>
  </ApolloProvider>
);
