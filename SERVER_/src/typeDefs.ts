import { gql } from 'apollo-server';

export const typeDefs = gql`
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
    workId: Int!
  }

  type Query {
    search(term: String!): [Work]
    works: [Work]
    worksByIds(ids: [Int]!): [Work]
    workById(id: Int!): Work
    chats(id: Int!): Chats
  }

  type Mutation {
    addWork(name: String, chats: inputChat): Work
    editWork(id: Int, name: String): Work
  }

  input inputChat {
    chat: [String]
    link: [String]
  }
`;
