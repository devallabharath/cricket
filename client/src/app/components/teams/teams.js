import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getTeams } from '@queries/teams'
import Form from '@components/forms/team'
import Team from './team'
import { FaPlus } from 'react-icons/fa6'

const Teams = () => {
  const [formStatus, setFormStatus] = useState({
    open: false,
    data: null,
  })
  const { data, loading, error } = useQuery(getTeams)

  const newForm = () => {
    setFormStatus({
      open: true,
      data: null,
    })
  }

  const editForm = data => {
    setFormStatus({
      open: true,
      data: data,
    })
  }

  const closeForm = () => {
    setFormStatus({
      open: false,
      data: null,
    })
  }

  return (
    <div className={styles.container}>
      {formStatus.open && <Form hide={closeForm} data={formStatus.data} />}
      <div className={styles.header}>
        <span className={styles.title}>Teams</span>
        <button className={styles.button} onClick={newForm}>
          <FaPlus />
        </button>
      </div>
      <div className={styles.list}>
        {loading
          ? 'loading...'
          : error
          ? error?.message
          : data.getTeams.length === 0
          ? 'No teams... Add one!'
          : data?.getTeams?.map(team => (
              <Team
                key={team.id}
                team={team}
                edit={editForm}
              />
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
  list: 'h-[calc(100%-theme(spacing.20))] p-1 rounded flex flex-col gap-1 items-center overflow-x-hidden overflow-y-scroll shadow-gray-500 shadow-md',
}

export default Teams
