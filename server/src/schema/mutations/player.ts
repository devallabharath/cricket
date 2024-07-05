import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql'
import playerType from '../../type/player'
import { Players } from '../../entities'

export const addPlayer = {
  type: playerType,
  args: {
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const result = await Players.insert(args)
    return { id: result.raw.insertId, ...args }
  },
}

export const editPlayer = {
  type: playerType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const player = await Players.findOneBy({ id: args.id })
    if (!player) return new Error('player not found')
    await Players.update({ id: args.id }, args)
    return args
  },
}

export const deletePlayer = {
  type: playerType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const player = await Players.findOneBy({ id: args.id })
    if (!player) return new Error('player not found')
    await Players.delete(args.id)
    return args
  },
}
