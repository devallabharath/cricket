import { GraphQLID, GraphQLList } from 'graphql'
import matchType from '../../type/match'
import { Matches } from '../../entities'
import { mapMatch } from '../utils'

export const getMatches = {
  type: new GraphQLList(matchType),
  async resolve() {
    const matches = await Matches.find()
    if (!matches) return new Error('No matches found')
    if (matches.length === 0) return []
    const mapped = await Promise.all(matches.map(async m => await mapMatch(m.id)))
    return mapped.sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
  },
}

export const getMatchByID = {
  type: matchType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    return mapMatch(args.id)
  },
}
