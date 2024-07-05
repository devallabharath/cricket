import { Players, Teams, Matches } from '../entities'

export const mapPlayers = async (ids: number[]) => {
  return ids.map(async id => await Players.findOneBy({ id }))
}

export const mapTeam = async (id: number) => {
  const team = await Teams.findOneBy({ id })
  if (!team) return new Error('No team found')
  return {
    id: team?.id,
    name: team?.name,
    captain: await Players.findOneBy({ id: team?.captain }),
  }
}

export const mapMatch = async (id: number) => {
  const m = await Matches.findOneBy({ id })
  if (!m) throw new Error('No match found')
  return {
    id: m.id,
    timestamp: m.timestamp,
    teamA: await mapTeam(m.teamA),
    teamB: await mapTeam(m.teamB),
    squadA: await mapPlayers(m.squadA),
    squadB: await mapPlayers(m.squadB),
    common: m.common ? await Players.findOneBy({ id: m.common }) : null,
    won: m.won,
    by: m.by,
    with: m.with,
  }
}
