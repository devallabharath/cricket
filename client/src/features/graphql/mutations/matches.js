import { gql } from '@apollo/client'

export const addMatch = gql`
  mutation addMatch(
    $timestamp: String!
    $teamA: ID!
    $teamB: ID!
    $squadA: [ID!]!
    $squadB: [ID!]!
    $common: ID
    $won: String!
    $by: Int!
    $with: String!
  ) {
    addMatch(
      timestamp: $timestamp
      teamA: $teamA
      teamB: $teamB
      squadA: $squadA
      squadB: $squadB
      common: $common
      won: $won
      by: $by
      with: $with
    ) {
      id
      timestamp
      teamA {id name captain{id name}}
      teamB {id name captain{id name}}
      squadA {id name}
      squadB {id name}
      common {id name}
      won
      by
      with
    }
  }
`

export const editMatch = gql`
  mutation editMatch(
    $id: ID!
    $timestamp: String!
    $teamA: ID!
    $teamB: ID!
    $squadA: [ID!]!
    $squadB: [ID!]!
    $common: ID
    $won: String!
    $by: Int!
    $with: String!
  ) {
    editMatch(
      id: $id
      timestamp: $timestamp
      teamA: $teamA
      teamB: $teamB
      squadA: $squadA
      squadB: $squadB
      common: $common
      won: $won
      by: $by
      with: $with
    ) {
      id
      timestamp
      teamA {id name captain{id name}}
      teamB {id name captain{id name}}
      squadA {id name}
      squadB {id name}
      common {id name}
      won
      by
      with
    }
  }
`

export const deleteMatch = gql`
  mutation deleteMatch($id: ID!) {
    deleteMatch(id: $id) {id}
  }
`
