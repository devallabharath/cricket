import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

const match = new GraphQLObjectType({
  name: 'matchAttendance',
  fields: () => ({
    id: { type: GraphQLID },
    timestamp: { type: GraphQLString },
    teamA: { type: GraphQLString },
    teamB: { type: GraphQLString },
    playedFor: { type: GraphQLString },
  }),
})

export default new GraphQLObjectType({
  name: 'attendance',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    matches: { type: new GraphQLList(match) },
    total: { type: GraphQLInt },
  }),
})
