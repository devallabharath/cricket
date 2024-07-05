import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql'
import matchType from '../../type/match'
import { Matches } from '../../entities'
import { mapMatch } from '../utils'

export const addMatch = {
  type: matchType,
  args: {
    timestamp: { type: GraphQLString },
    teamA: { type: GraphQLID },
    teamB: { type: GraphQLID },
    squadA: { type: new GraphQLList(GraphQLID) },
    squadB: { type: new GraphQLList(GraphQLID) },
    common: { type: GraphQLID || null },
    won: { type: GraphQLString },
    by: { type: GraphQLInt },
    with: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const result = await Matches.insert(args)
    return mapMatch(result.raw.insertId)
  },
}

export const editMatch = {
  type: matchType,
  args: {
    id: { type: GraphQLID },
    timestamp: { type: GraphQLString },
    teamA: { type: GraphQLID },
    teamB: { type: GraphQLID },
    squadA: { type: new GraphQLList(GraphQLID) },
    squadB: { type: new GraphQLList(GraphQLID) },
    common: { type: GraphQLID || null },
    won: { type: GraphQLString },
    by: { type: GraphQLInt },
    with: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const team = await Matches.findOneBy({ id: args.id })
    if (!team) return new Error('Team not found')
    await Matches.update({ id: args.id }, args)
    return mapMatch(args.id)
  },
}

export const deleteMatch = {
  type: matchType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const team = await Matches.findOneBy({ id: args.id })
    if (!team) return new Error('Team not found')
    await Matches.delete(args.id)
    return {id: args.id, ...args}
  },
}
