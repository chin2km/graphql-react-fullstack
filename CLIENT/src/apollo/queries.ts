import gql from "graphql-tag";

export const WORKS_QUERY = gql`
    query WorksQuery {
        works {
            id
            name
            tags
            chats {
                chat
                link
            }
        }
    }
`;
