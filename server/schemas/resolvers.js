const {User, Thought} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

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
        // get your own user details
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('thoughts')
                    .populate('friends');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
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
            const token = signToken(user);
            return {token, user};
        },
        addThought: async (parent, args, context) => {
            if (context.user) {
                // spread operator gets everything in args individually and then also adds context.user.username to the object
                const thought = await Thought.create({...args, username: context.user.username});
                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {thoughts: thought._id}},
                    {new: true}
                );
                return thought;
            }
            throw new AuthenticationError('You are not logged in.')
        },
        login: async (parent, {email, password}) => {
            // checking if user exists
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // checking if password of user is corrext
            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(User);
            return {token, user};
        }
    }
};

module.exports = resolvers