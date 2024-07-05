import { GraphQLObjectType, GraphQLInt } from 'graphql'
import matchType from './match'

const countsType = new GraphQLObjectType({
  name: 'infoCount',
  fields: () => ({
    players: { type: GraphQLInt },
    teams: { type: GraphQLInt },
    matches: { type: GraphQLInt },
  }),
})

export default new GraphQLObjectType({
  name: 'quickInfo',
  fields: () => ({
    counts: { type: countsType },
		match: {type: matchType}
  }),
})
