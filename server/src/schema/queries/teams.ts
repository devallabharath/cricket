import { GraphQLID, GraphQLList } from 'graphql'
import teamType from '../../type/team'
import { Teams, Matches } from '../../entities'
import { mapTeam } from '../utils'

const mapStats = (id: number, matches: any) => {
  id = Number(id)
  let wins = 0
  let played = 0
  for (const m of matches) {
    if (m.teamA !== id && m.teamB !== id) continue
    if (m[m.won] === id) wins++
    played++
  }
  return { wins, played }
}

export const getTeams = {
  type: new GraphQLList(teamType),
  async resolve() {
    let teams = await Teams.find()
    if (!teams) return new Error('No teams found')
    if (teams.length === 0) return []
    const matches = await Matches.find()
    teams = teams.sort((a,b) => {
      const x = a.name.toLowerCase()
      const y = b.name.toLowerCase()
      return x > y ? 1 : x < y ? -1 : 0
    })
    return teams.map(async team => {
      const map = await mapTeam(team.id)
      return { ...map, ...mapStats(team.id, matches) }
    })
  },
}

export const getTeamByID = {
  type: teamType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const team = await mapTeam(args.id)
    const matches = await Matches.find()
    return { ...team, ...mapStats(args.id, matches) }
  },
}
