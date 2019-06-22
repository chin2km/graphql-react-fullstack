import gql from "graphql-tag";

export const EDIT_WORK_MUTATION = gql`
    mutation EditWork($id: Int, $work: InputWork) {
        editWork(id: $id, work: $work) {
            name
            tags
            chats {
                chat
                link
            }
        }
    }
`;
