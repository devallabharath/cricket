import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getPlayers } from '@queries/players'
import Form from '@components/forms/player'
import Player from './player'
import { FaPlus } from 'react-icons/fa6'

const Players = () => {
  const [form, setForm] = useState(false)
  const { data, loading, error } = useQuery(getPlayers)

  const newForm = () => {
    setForm(true)
  }

  const closeForm = () => {
    setForm(false)
  }

  return (
    <div className={styles.container}>
      {form && <Form hide={closeForm} />}
      <div className={styles.header}>
        <span className={styles.title}>Players</span>
        <button className={styles.button} onClick={newForm}>
          <FaPlus />
        </button>
      </div>
      <div className={styles.list}>
        {loading
          ? 'loading...'
          : error
          ? error.message
          : data.getPlayers.length === 0
          ? 'No players... Add one!'
          : data.getPlayers.map(player => (
              <Player key={player.id} player={player} />
            ))}
      </div>
    </div>
  )
}

const styles = {
  container: 'w-3/6 max-lg:w-4/6 max-md:w-5/6 max-sm:w-full h-full',
  header:
    'mx-5 my-2 h-10 flex flex-row items-center justify-center text-lg max-sm:text-md',
  title: 'flex-auto text-4xl max-sm:text-3xl',
  button: 'p-2 rounded-full text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-600',
  list: 'h-[calc(100%-theme(spacing.20))] p-1 rounded flex flex-col gap-2 items-center overflow-x-hidden overflow-y-scroll shadow-gray-500 shadow-md',
}

export default Players
