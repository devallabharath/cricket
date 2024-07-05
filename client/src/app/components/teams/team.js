import { useMutation, useApolloClient } from '@apollo/client'
import { getTeams } from '@queries/teams'
import { deleteTeam } from '@mutations/teams'
import { GiAmericanFootballHelmet } from 'react-icons/gi'
import { PiCricketFill } from 'react-icons/pi'
import { FaThumbsUp, FaPencil, FaTrash } from 'react-icons/fa6'

const src = id => {
  let img
  try {
    img = require(`../../assets/images/teams/${id}.jpeg`)
  } catch {
    img = require(`../../assets/images/teams/0.jpeg`)
  }
  return img
}

const Team = ({ team, edit }) => {
  const client = useApolloClient()
  const [Delete] = useMutation(deleteTeam, {
    variables: { id: team.id },
    update: (cache, response) => {
      const res = response.data.deleteTeam
      const teams = client.readQuery({ query: getTeams }).getTeams
      client.writeQuery({
        query: getTeams,
        data: { getTeams: teams.filter(t => t.id !== res.id) },
      })
    },
  })

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={src(team.id)} alt='some' />
      <div className={styles.details}>
        <span className={styles.detail}>
          <PiCricketFill className={styles.icon} />
          : {team.name}
        </span>
        <span className={styles.detail}>
          <GiAmericanFootballHelmet className={styles.icon} />
          : {team.captain.name}
        </span>
        <span className={styles.detail}>
          <FaThumbsUp className={styles.icon} />
          : {team.wins} / {team.played}
        </span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.edit} onClick={() => edit(team)}>
          <FaPencil />
        </button>
        <button className={styles.delete} onClick={Delete}>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

const styles = {
  container:
    'w-full flex flex-row bg-white dark:bg-neutral-900 rounded p-0.5 text-md max-sm:text-sm text-black dark:text-white',
  logo: 'w-1/5 rounded',
  details: 'w-3/5 p-2 flex-auto flex-col',
  detail: 'flex flex-row gap-1 items-center',
  icon: 'text-gray-500',
  buttons:
    'w-fit px-2 text-gray-500 text-sm max-sm:text-xs flex flex-col items-end justify-evenly',
  edit: 'p-1 hover:text-yellow-200 active:text-yellow-300',
  delete: 'p-1 hover:text-red-400 active:text-red-500',
}

export default Team
