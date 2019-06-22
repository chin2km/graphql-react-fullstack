import gql from "graphql-tag";

export const WORKS_QUERY = gql`
    {
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
