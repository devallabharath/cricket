import { GraphQLID, GraphQLList } from 'graphql'
import playerType from '../../type/player'
import { Players } from '../../entities'

export const getPlayers = {
  type: new GraphQLList(playerType),
  async resolve() {
    const players = await Players.find()
    if (!players) return new Error('No players found')
    if (players.length === 0) return []
    return players.sort((a, b) => {
      const x = a.name.toLowerCase()
      const y = b.name.toLowerCase()
      return x < y ? -1 : x > y ? 1 : 0
    })
  },
}

export const getPlayerByID = {
  type: playerType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const player = await Players.findOneBy({ id: args.id })
    if (!player) return new Error('No player found')
    return player
  },
}
