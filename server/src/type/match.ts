import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import playerType from './player'
import teamType from './team'

export default new GraphQLObjectType({
  name: 'match',
  fields: () => ({
    id: { type: GraphQLID },
    timestamp: { type: GraphQLString },
    teamA: { type: teamType },
    teamB: { type: teamType },
    squadA: { type: new GraphQLList(playerType) },
    squadB: { type: new GraphQLList(playerType) },
    common: { type: playerType || null },
    won: { type: GraphQLString },
    by: { type: GraphQLInt },
    with: { type: GraphQLString },
  }),
})
