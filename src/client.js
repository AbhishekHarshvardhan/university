import { ApolloClient, InMemoryCache } from "@apollo/client";
import { apiURL } from "./config.json";

const client = new ApolloClient({
  uri: apiURL,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  connectToDevTools: true,
});

export default client;
