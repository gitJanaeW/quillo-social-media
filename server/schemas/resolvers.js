const {User, Thought} = require('../models');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // parent param is not used but is required since 2nd param should be the query params (not the 1st)
        // get a user by id
        user: async (parent, {username}) => {
            return User.findOne({username})
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get thought (or a specfic user's thoughts)
        thoughts: async (parent, {username}) => {
            // if username, query the specific username. else, no params needed 
            const params = username ? {username} : {};
            // finding all Thoughts with params--or no params (sorted in descending order)
            return Thought.find(params).sort({createdAt: -1});
        },
        // get thoughts by id
        thought: async (parent, {_id}) => {
            return Thought.findOne({_id});
        }
    },
    Mutation: {
        // Mongoose will create a new user with whatever is passed into args
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        login: async (parent, {email, password}) => {
            // checking if user exists
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // checking if password of user is corrext
            const correctPW = await user.isCorrectPassword(isCorrectPassword);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            return user;
        }
    }
};

module.exports = resolvers