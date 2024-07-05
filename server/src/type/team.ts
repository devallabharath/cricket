import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql'
import playerType from './player'

export default new GraphQLObjectType({
  name: 'team',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    captain: { type: playerType },
    wins: { type: GraphQLInt },
    played: { type: GraphQLInt },
  }),
})
