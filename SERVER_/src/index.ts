// import 'apollo-cache-control';
import { ApolloServer, gql } from "apollo-server";
import {resolvers} from "./resolvers"
import {typeDefs} from "./typeDefs"

const server = new ApolloServer({
  resolvers, typeDefs,
});

server.listen({ port: 5555 }).then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
