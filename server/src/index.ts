// import 'apollo-cache-control';
import { ApolloServer, gql, IResolvers } from "apollo-server";
import { fetchChatById, fetchWorkByIds, fetchWorks, searchWork } from "./resolvers";

const typeDefs = gql`
  type Work {
    id: Int
    name: String
    tags: [String]
    images: Int
    chats: Chats
  }

  type Chats {
    chat: [String]
    link: [String]
    work: Work
    id: Int!
  }

  type Query {
    search(term: String!): [Work]
    works: [Work]
    worksByIds(ids: [Int]!): [Work]
    workById(id: Int!): Work
    chats(id: Int!): Chats
  }

  type Mutation {
    addWork(name: String): Work
  }
`;

const resolvers: IResolvers = {
  Query: {
    works: fetchWorks,
    search: (_, args) => searchWork(args.term),
    worksByIds: (_, args) => fetchWorkByIds(args.ids),
    workById: async (_, args) => {
      const response = await fetchWorkByIds([args.id]);
      return response[0];
    },
    chats: (_, args) => fetchChatById(args.id)
  },
  Work: {
    chats: ({id}) => fetchChatById(id)
  },
  Chats: {
    work: async ({id}) => {
      const response = await fetchWorkByIds([id]);
      return response[0];
    }
  }
};

const server = new ApolloServer({
  resolvers, typeDefs,
});

server.listen({ port: 5555 }).then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
