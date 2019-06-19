import { GraphQLSchema } from "graphql";
import { rootMutationType, rootQueryType } from "./graphqlTypes";

export const SCHEMA = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
})