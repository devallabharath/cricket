import { GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import teamType from '../../type/team'
import { Teams } from '../../entities'
import { mapTeam } from '../utils'

export const addTeam = {
  type: teamType,
  args: {
    name: { type: GraphQLString },
    captain: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    const result = await Teams.insert(args)
    return mapTeam(result.raw.insertId)
  },
}

export const editTeam = {
  type: teamType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    captain: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    const team = await Teams.findOneBy({ id: args.id })
    if (!team) return new Error('Team not found')
    await Teams.update({ id: args.id }, args)
    return mapTeam(args.id)
  },
}

export const deleteTeam = {
  type: teamType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const team = await Teams.findOneBy({ id: args.id })
    if (!team) return new Error('Team not found')
    await Teams.delete(args.id)
    return args
  },
}
