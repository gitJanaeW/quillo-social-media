const {User, Thought} = require('../models');

const resolvers = {
    Query: {
        // the parent paramater is like a placeholder so username can be stored as the 2nd parameter
        thoughts: async (parent, {username}) => {
            // if username, query the specific username. else, no params needed 
            const params = username ? {username} : {};
            // finding all Thoughts with params--or no params (sorted in descending order)
            return Thought.find(params).sort({createdAt: -1});
        }
    }
};

module.exports = resolvers