import { gql } from '@apollo/client'

export const getTeams = gql`
  query getTeams {
    getTeams {
      id
      name
      captain {
        id
        name
      }
      wins
      played
    }
  }
`

export const getTeamByID = gql`
  query getTeamByID($id: ID!) {
    getTeamByID(id: $id) {
      id
      name
      captain {
        id
        name
      }
      wins
      played
    }
  }
`
