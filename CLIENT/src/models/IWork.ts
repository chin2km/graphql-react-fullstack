export interface IWork {
    id: number;
    name: string;
    tags?: string[];
    chats: {
        chat?: string[];
        link?: string[];
    };
}
