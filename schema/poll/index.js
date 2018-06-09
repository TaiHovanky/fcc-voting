const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

const PollType = new GraphQLObjectType({
    name: 'Poll',
    fields: {
        _id: { type: GraphQLString },
        question: { type: GraphQLString },
        option1: { type: new GraphQLObjectType({
            name: 'pollOption',
            fields: {
                name: { type: GraphQLString },
                votes: { type: GraphQLInt }
            }
        })}
    }
});

const pollResolver = (parentValue, args) => axios.get('/polls/allpolls')
    .then(response => response.data);

module.exports = {
    PollType,
    pollResolver
};
