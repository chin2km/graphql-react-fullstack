import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';
import fetch from 'node-fetch';
import { IWork } from './db/MyData';

export const fetchWorks = async () => {
    const response = await fetch('http://localhost:3000/works');
    return response.json();
};

export const fetchChatById = async (id: number) => {
    const response = await fetch(`http://localhost:3000/chats/${id}`);
    return response.json();
};
export const fetchWorkByIds = async (ids: number[]) => {
    const query = ids.map(id => `id=${id}`).join('&');
    const response = await fetch(`http://localhost:3000/works/?${query}`);
    return response.json();
};

export const searchWork = async (term: string) => {
    const response = await fetch(`http://localhost:3000/works/?name=${term}`);
    return response.json();
}

export const addWork = async (work: IWork) => {
    const response = await fetch("http://localhost:3000/works", {
        method: "POST",
        body: JSON.stringify(work),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json();
}

export const editWork = async (id: number, name: string) => {
    const response = await fetch(`http://localhost:3000/works/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            name,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json();
}

const WorkType = new GraphQLObjectType({
    name: 'work',
    description: 'work details',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        chat: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        images: { type: GraphQLInt },
        link: { type: new GraphQLList(GraphQLString) }
    })
});

export const rootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addWork: {
            type: WorkType,
            description: 'Add a work',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => addWork(args as IWork)
        },
        editWork: {
            type: WorkType,
            description: 'Edit a work',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                name: {type: GraphQLString}
            },
            resolve: async (_, args) => editWork(args.id, args.name)
        }
    })
});
