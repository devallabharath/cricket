import { gql } from '@apollo/client'

export const getQuickInfo = gql`
  query getQuickInfo {
    getQuickInfo {
      counts {
        players
        teams
        matches
      }
      match {
        id
        timestamp
        teamA {
          id
          name
          captain {
            id
            name
          }
        }
        teamB {
          id
          name
          captain {
            id
            name
          }
        }
        squadA {
          id
          name
          phone
        }
        squadB {
          id
          name
          phone
        }
        common {
          id
          name
          phone
        }
        won
        by
        with
      }
    }
  }
`
