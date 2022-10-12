import {gql} from '@apollo/client';

// we're writing the queries we previously wrote in Apollo Studio Explorer into the front-end
export const QUERY_THOUGHTS = gql`
query thoughts($username: String) {
    thoughts(username: $username) {
        _id
        thoughtText
        createdAt
        username
        reactionCount
        reactions {
            _id
            createdAt
            username
            reactionBody
        }
    }
}
`;