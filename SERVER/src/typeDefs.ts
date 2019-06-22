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
    addWork(work: InputWork): Work
    editWork(id: Int, work: InputWork): Work
  }

  input InputChat {
    chat: [String]
    link: [String]
  }
  input InputWork {
    name: String
    tags: [String]
    chats: InputChat
  }
`;
