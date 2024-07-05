import { useState } from 'react'
import Form from '@components/forms/match'
import { useQuery } from '@apollo/client'
import { getMatches } from '@queries/matches'
import Match from './match'
import { FaPlus } from 'react-icons/fa6'

const Matches = () => {
  const [formStatus, setFormStatus] = useState(false)
  const { data, loading, error } = useQuery(getMatches)

  const newForm = () => {
    setFormStatus(true)
  }

  const closeForm = () => {
    setFormStatus(false)
  }

  return (
    <div className={styles.container}>
      {formStatus && <Form hide={closeForm} />}
      <div className={styles.header}>
        <span className={styles.title}>
          Matches
          <span className={styles.count}>{data?.getMatches?.length}</span>
        </span>
        <button className={styles.button} onClick={newForm}>
          <FaPlus />
        </button>
      </div>
      <div className={styles.list}>
        {loading
          ? 'loading...'
          : error
          ? error?.message
          : data.getMatches.length === 0
          ? 'No matches... Add one!'
          : data.getMatches.map(match => <Match key={match.id} match={match} />)}
      </div>
    </div>
  )
}

const styles = {
  container: 'w-3/6 max-lg:w-4/6 max-md:w-5/6 max-sm:w-full h-full',
  header:
    'mx-5 my-2 h-10 flex flex-row items-center justify-center text-lg max-sm:text-md',
  title: 'flex flex-auto text-4xl max-sm:text-3xl items-center',
  count: 'mx-3 text-sm text-neutral-500',
  button: 'p-2 rounded-full text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-600',
  list: 'h-[calc(100%-theme(spacing.20))] p-1 rounded flex flex-col gap-1 items-center overflow-x-hidden overflow-y-scroll shadow-gray-500 shadow-md',
}

export default Matches
