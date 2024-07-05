import { GraphQLID, GraphQLList } from 'graphql'
import attendanceType from '../../type/attendance'
import { Players, Teams, Matches } from '../../entities'

const track = async (Id: number, matches: any) => {
  const tmp: any = []
  for (const m of matches) {
    let { id, teamA, teamB, squadA, squadB, common, timestamp } = m
    squadA = squadA.map((id: string)=>Number(id))
    squadB = squadB.map((id: string)=>Number(id))
    if (![...squadA, ...squadB, common].includes(Id)) continue
    const playedFor = squadA.includes(Id)
      ? 'teamA'
      : squadB.includes(Id)
      ? 'teamB'
      : 'common'
    const A = await Teams.findOneBy({ id: teamA })
    const B = await Teams.findOneBy({ id: teamB })
    tmp.push({
      id,
      timestamp,
      playedFor,
      teamA: A?.name,
      teamB: B?.name,
    })
  }
  return { matches: tmp, total: matches.length }
}

export const getAttendance = {
  type: new GraphQLList(attendanceType),
  async resolve() {
    const players = await Players.find()
    if (!players) return new Error('No players found')
    const matches = await Matches.find()
    if (!matches) return new Error('No matches found')
    const result = []
    for (const p of players) {
      const attendance = await track(p.id, matches)
      result.push({
        id: p.id,
        name: p.name,
        ...attendance,
      })
    }
    return result
  },
}

export const getAttendanceByID = {
  type: attendanceType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const player = await Players.findOneBy({ id: args.id })
    if (!player) return new Error('No player found')
    const matches = await Matches.find()
    if (!matches) return new Error('No matches found')
    const attendance = await track(player.id, matches)
    return {
      id: player.id,
      name: player.name,
      ...attendance,
    }
  },
}
