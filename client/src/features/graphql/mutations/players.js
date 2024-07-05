import { gql } from '@apollo/client'

export const addPlayer = gql`
  mutation addPlayer($name: String!, $phone: String!) {
    addPlayer(name: $name, phone: $phone) {
			id
			name
			phone
		}
  }
`

export const editPlayer = gql`
  mutation editPlayer($id: ID!, $name: String!, $phone: String!) {
    editPlayer(id: $id, name: $name, phone: $phone) {
			id
			name
			phone
		}
  }
`

export const deletePlayer = gql`
	mutation deletePlayer($id: ID!) {
		deletePlayer(id: $id) {id}
	}
`
