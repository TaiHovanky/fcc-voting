const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema
} = graphql;

const { PollType, pollResolver } = require('./poll');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        AllPolls: {
            type: new GraphQLList(PollType),
            resolve: pollResolver
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});