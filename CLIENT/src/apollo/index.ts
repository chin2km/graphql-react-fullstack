import ApolloClient from "apollo-boost";

export const ClientApollo = new ApolloClient({
    uri: "http://localhost:5555",
});

export * from "./queries";
