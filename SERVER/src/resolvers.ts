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
      addWork: async (_, {work}) => {
        const {chats, ...restWork} = work;
        const Work = await CONNECTION.addWork(restWork);
        await CONNECTION.addChat({
          workId: Work.id,
          ...chats
        });
        return Work;
      },
      editWork: async (_, {id, work}) => {
        const {chats, ...restWork} = work;
        const editedWork = await CONNECTION.editWork(id, restWork);
        await CONNECTION.editChats({
          workId: editedWork.id,
          ...chats
        });
        return editedWork;
      }
    }
  };