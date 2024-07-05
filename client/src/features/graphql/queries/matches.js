import { gql } from '@apollo/client'

export const getMatches = gql`
  query getMatches {
    getMatches {
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
`

export const getMatchByID = gql`
  query getMatchByID($id: ID!) {
    getMatchByID(id: $id) {
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
`
