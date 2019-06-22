import fetch from "node-fetch";
import { IWork } from "./db/MyData";

export const CONNECTION = {
    async fetchWorks() {
        const response = await fetch('http://localhost:3000/works');
        return response.json();
    },
    async fetchChatById(id: number) {
        const response = await fetch(`http://localhost:3000/chats/?workId=${id}`);
        return response.json();
    },
    async fetchWorkByIds(ids: number[]) {
        const query = ids.map(id => `id=${id}`).join('&');
        const response = await fetch(`http://localhost:3000/works/?${query}`);
        return response.json();
    },
    async searchWork(term: string) {
        const response = await fetch(`http://localhost:3000/works/?name=${term}`);
        return response.json();
    },
    async addWork(work: IWork) {
        const response = await fetch("http://localhost:3000/works", {
            method: "POST",
            body: JSON.stringify(work),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.json();
    },
    async addChat(chat: any) {
        const response = await fetch("http://localhost:3000/chats", {
            method: "POST",
            body: JSON.stringify(chat),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.json();
    },
    async editChats(chat: any) {
        const response = await fetch(`http://localhost:3000/chats/${chat.workId}`, {
            method: "PATCH",
            body: JSON.stringify(chat),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.json();
    },
    async editWork(id: number, work: IWork) {
        const response = await fetch(`http://localhost:3000/works/${id}`, {
            method: "PATCH",
            body: JSON.stringify(work),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.json();
    }

}
