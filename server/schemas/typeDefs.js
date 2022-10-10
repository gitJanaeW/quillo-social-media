// import GraphQL tagged template function (so we can use its advanced template literals)
const {gql} = require('apollo-server-express');
// create typeDefs
const typeDefs = gql`
type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
}    
type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
}
type Query {
        thoughts(username:String): [Thought]
    }
`;
// export typeDefs
module.exports = typeDefs;