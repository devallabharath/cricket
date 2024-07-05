import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
  name: 'player',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
})
