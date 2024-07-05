import { gql } from '@apollo/client'

export const getPlayers = gql`
  query getPlayers {
    getPlayers {
      id
      name
      phone
    }
  }
`

export const getPlayerByID = gql`
  query getPlayerByID($id: ID!) {
    getPlayerByID(id: $id) {
      id
      name
      phone
    }
  }
`
