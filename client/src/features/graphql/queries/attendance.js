import { gql } from '@apollo/client'

export const getAttendance = gql`
  query getAttendance {
    id
    name
    matches {
      id
      timestamp
      teamA
      teamB
      playedFor
    }
    total
  }
`

export const getAttendanceByID = gql`
  query getAttendanceByID($id: ID!) {
    getAttendanceByID(id: $id) {
      id
      name
      matches {
        id
        timestamp
        teamA
        teamB
        playedFor
      }
      total
    }
  }
`
