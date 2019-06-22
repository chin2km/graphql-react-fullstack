import gql from "graphql-tag";

export const WORKS_QUERY = gql`
    {
        works {
            name
            tags
            chats {
                chat
                link
            }
        }
    }
`;
