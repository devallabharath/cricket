import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { getPlayers } from '@queries/players'
import { getAttendanceByID } from '@queries/attendance'
import { deletePlayer } from '@mutations/players'
import Form from '@components/forms/player'
import { FaPencil, FaTrash, FaUserLarge, FaPhone } from 'react-icons/fa6'

const datetostring = date => {
  date = new Date(Number(date))
  return date.toString().slice(4, 21)
}

const Profile = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const client = useApolloClient()
  const [form, setForm] = useState(false)
  const [player, setPlayer] = useState(state)
  const { data, loading, error } = useQuery(getAttendanceByID, {
    variables: { id: player.id },
  })
  const attendance = data?.getAttendanceByID

  const gotoMatch = m => navigate(`/matches/${m.id}`)

  const Edit = () => {
    setForm(true)
  }

  const closeForm = data => {
    setForm(false)
  }

  const [Delete] = useMutation(deletePlayer, {
    variables: { id: player.id },
    update: (cache, response) => {
      const res = response.data.deletePlayer
      const players = client.readQuery({ query: getPlayers }).getPlayers
      client.writeQuery({
        query: getPlayers,
        data: { getPlayers: players.filter(p => p.id !== res.id) },
      })
    },
  })

  if (loading) return 'loading'
  if (error) return error.message

  return (
    <div className={styles.container}>
      {form && <Form hide={closeForm} data={player} />}
      <div className={styles.controls}>
        <span className={styles.header}>Player ID: {player.id}</span>
        <button className={styles.edit} onClick={Edit}>
          <FaPencil /> Edit
        </button>
        <button className={styles.delete} onClick={Delete}>
          <FaTrash /> Delete
        </button>
      </div>
      <div className={styles.overview}>
        <div className={styles.detail}>
          <FaUserLarge />
          {player.name}
        </div>
        <div className={styles.detail}>
          <FaPhone />
          {player.phone}
        </div>
      </div>
      <div className={styles.matches}>
        <div className={styles.matchesHeader}>
          <span className={styles.title}>Played Matches</span>
          <span className={styles.count}>
            {attendance.matches.length} / {attendance.total}
          </span>
        </div>
        {attendance.matches.map(m => (
          <div key={m.id} className={styles.match} onClick={() => gotoMatch(m)}>
            {/* <span>ID: {m.id}</span> */}
            <span>{datetostring(m.timestamp)}</span>
            <span className=''>
              {m.teamA} vs {m.teamB}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container:
    'w-4/6 py-4 max-lg:w-4/6 max-md:w-5/6 max-sm:w-full h-full text-md max-md:text-sm flex flex-col gap-1 overflow-scroll',
  controls: 'w-full my-2 text-sm flex flex-row gap-2 px-2 items-center',
  header: 'flex-auto font-semibold text-2xl max-sm:text-md',
  edit: 'p-1 max-sm:p-0.5 flex flex-row gap-0.5 items-center rounded bg-white dark:bg-neutral-900 hover:text-blue-500 active:bg-blue-500 active:text-neutral-100',
  delete:
    'w-fit p-1 max-sm:p-0.5 flex flex-row gap-0.5 items-center rounded bg-white dark:bg-neutral-900 hover:text-red-500 active:bg-red-500 active:text-neutral-100',
  overview: 'flex flex-row justify-between p-2 rounded bg-white dark:bg-neutral-900',
  detail: 'w-full h-full flex flex-row gap-2 items-center justify-center',
  matchesHeader: 'flex flex-row items-center justify-center gap-3',
  title: 'text-center font-semibold text-xl max-md:text-lg max-sm:text-md',
  count: 'text-gray-800 dark:text-gray-600',
  matches:
    'p-1 flex flex-col gap-2 rounded items-center overflow-x-hidden overflow-y-scroll shadow-gray-500 shadow-md',
  match:
    'px-2 py-1 w-full flex flex-row gap-1 justify-evenly bg-white dark:bg-neutral-900 rounded border cursor-pointer hover:text-blue-500 hover:border-blue-400',
}

export default Profile
