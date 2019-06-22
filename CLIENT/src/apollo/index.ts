import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache({
    addTypename: false,
});

export const ClientApollo = new ApolloClient({
    uri: "http://localhost:5555",
    cache,
});

export * from "./queries";
