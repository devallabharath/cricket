import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { getPlayers, getPlayerByID } from './queries/player'
import { addPlayer, deletePlayer, editPlayer } from './mutations/player'
import { getTeams, getTeamByID } from './queries/teams'
import { addTeam, deleteTeam, editTeam } from './mutations/team'
import { getMatches, getMatchByID } from './queries/matches'
import { addMatch, editMatch, deleteMatch } from './mutations/match'
import { getAttendance, getAttendanceByID } from './queries/attendance'

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getPlayers,
    getPlayerByID,
    getTeams,
    getTeamByID,
    getMatches,
    getMatchByID,
    getAttendance,
    getAttendanceByID
  },
})

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addPlayer,
    editPlayer,
    deletePlayer,
    addTeam,
    editTeam,
    deleteTeam,
    addMatch,
    editMatch,
    deleteMatch
  },
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
