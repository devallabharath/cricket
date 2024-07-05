import { gql } from '@apollo/client'

export const addTeam = gql`
  mutation addTeam($name: String!, $captain: Int!) {
    addTeam(name: $name, captain: $captain) {
      id
      name
      captain {
        id
        name
      }
    }
  }
`

export const editTeam = gql`
  mutation editTeam($id: ID!, $name: String!, $captain: Int!) {
    editTeam(id: $id, name: $name, captain: $captain) {
      id
      name
      captain {
        id
        name
      }
    }
  }
`

export const deleteTeam = gql`
  mutation deleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
    }
  }
`
