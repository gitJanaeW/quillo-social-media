// import GraphQL tagged template function (so we can use its advanced template literals)
const {gql} = require('apollo-server-express');
// create typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
}
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
type Auth {
    token: ID!
    user: User
}
type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
}
`;

// export typeDefs
module.exports = typeDefs;