export interface IWork {
    name: string;
    tags?: string[];
    chats: {
        chat?: string[];
        link?: string[];
    };
}
