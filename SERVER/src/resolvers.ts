import { IResolvers } from 'graphql-tools';
import { CONNECTION } from './jsonConnection';

export const resolvers: IResolvers = {
    Query: {
      works: CONNECTION.fetchWorks,
      search: (_, args) => CONNECTION.searchWork(args.term),
      worksByIds: (_, args) => CONNECTION.fetchWorkByIds(args.ids),
      workById: async (_, args) => {
        const response = await CONNECTION.fetchWorkByIds([args.id]);
        return response[0];
      },
      chats: async (_, args) => (await CONNECTION.fetchChatById(args.id))[0]
    },
    Work: {
      chats: async ({id}) => (await CONNECTION.fetchChatById(id))[0]
    },
    Chats: {
      work: async ({id}) => {
        const response = await CONNECTION.fetchWorkByIds([id]);
        return response[0];
      }
    },
    Mutation: {
      addWork: async (_, args) => {
        const Work = await CONNECTION.addWork({name: args.name});
        await CONNECTION.addChat({
          workId: Work.id,
          ...args.chats
        });
        return Work;
      },
      editWork: (_, args) => CONNECTION.editWork(args.id, args.name)
    }
  };