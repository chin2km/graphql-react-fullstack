import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql";
import { WORKS } from "./db/MyData";

import fetch from "node-fetch";

const fetchWorks = async () => (await fetch("http://localhost:3000/works")).json();

const WorkType = new GraphQLObjectType({
    name: "work",
    description: "work details",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        chat: { type: new GraphQLList(GraphQLString) },
        tags: {type: new GraphQLList(GraphQLString)},
        images: {type: GraphQLInt},
        link: {type: new GraphQLList(GraphQLString)}
    })
})

const rootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "get my works data",
    fields: () => ({
        search: {
            type: new GraphQLList(WorkType),
            description: "a single work",
            args: {
                term: {
                    type: GraphQLString
                }
            },
            resolve: (_, args) => WORKS.filter(({name}) => name.toLowerCase().split(args.term.toLowerCase()).length>1)
        },
        work: {
            type: WorkType,
            description: "a single work",
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (_, args) => WORKS[args.id]
        },
        worksByIds: {
            type: new GraphQLList(WorkType),
            description: "queried works",
            args: {
                ids: {
                    type: new GraphQLList(GraphQLInt)
                }
            },
            resolve: (_, args) => args.ids.map((id: number) => WORKS[id])
        },
        works: {
            type: new GraphQLList(WorkType),
            description: "my works",
            resolve: fetchWorks
        },
    })
});

const rootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: "Root Mutation",
    fields: () => ({
        addWork: {
            type: new GraphQLList(WorkType),
            description: "Add a work",
            args: {
                name: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (_, args) => {
                if(WORKS.find(({name}) => name===args.name)) {
                    throw Error(`work with name ${args.name} already exists`);
                }
                WORKS.push({
                    name: args.name,
                })
                return WORKS;
            }
        }
    })
});

export const SCHEMA = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
})