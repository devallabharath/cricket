import infoType from '../../type/quickInfo'
import { Players, Teams, Matches } from '../../entities'
import { mapMatch } from '../utils'

export const getQuickInfo = {
  type: infoType,
  async resolve() {
    const match = await Matches.find({ order: { id: 'DESC' }, take: 1 })
    const players = await Players.count()
    const teams = await Teams.count()
    const matches = await Matches.count()
    if (!match) throw new Error('No matches')
    return {
      counts: { players, teams, matches },
      match: mapMatch(match[0].id),
    }
  },
}
