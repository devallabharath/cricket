import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { getPlayers } from '@queries/players'
import { getTeams } from '@queries/teams'
import { addTeam, editTeam } from '@mutations/teams'
import { useForm } from 'react-hook-form'
import Modal from '@generics/modal'

const Form = ({ hide, data: team }) => {
  const mode = team ? 'Edit' : 'New'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const client = useApolloClient()
  const { data, loading, error } = useQuery(getPlayers)
  const [Add] = useMutation(addTeam)
  const [Edit] = useMutation(editTeam)

  const onSubmit = (fdata, mode) => {
    if (mode === 'New') {
      Add({
        variables: fdata,
        update: (cache, response) => {
          const res = response.data.addTeam
          const teams = client.readQuery({ query: getTeams })?.getTeams
          if(!teams) return
          client.writeQuery({
            query: getTeams,
            data: { getTeams: [...teams, res] },
          })
        },
      })
    } else {
      Edit({
        variables: { id: team.id, ...fdata },
        update: (cache, response) => {
          const res = response.data.editTeam
          const teams = client.readQuery({ query: getTeams })?.getTeams
          if(!teams) return
          client.watchQuery({
            query: getTeams,
            data: {
              getTeams: teams.map(t => {
                if (t.id === res.id) return res
                return t
              }),
            },
          })
        },
      })
    }
    hide()
  }
  return (
    <Modal title={mode + ' Team'} hide={hide}>
      {loading ? (
        'loading...'
      ) : error ? (
        error.message
      ) : (
        <form
          className={styles.form}
          onSubmit={handleSubmit(fdata => onSubmit(fdata, mode))}
        >
          <div className={styles.field}>
            <label htmlFor='name' className={styles.label}>
              Name
            </label>
            <input
              id='name'
              className={styles.input}
              defaultValue={team?.name ?? ''}
              {...register('name', { required: true })}
            />
            {errors.name && <span className={styles.error}>This field is required</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor='captain' className={styles.label}>
              Captain
            </label>
            <select
              id='captain'
              className={styles.select}
              defaultValue={team?.captain.id ?? ''}
              {...register('captain', { required: true, valueAsNumber: true })}
            >
              {data.getPlayers.map(player => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
            {errors.captain && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
          <button className={styles.submit} type='submit'>
            Submit
          </button>
        </form>
      )}
    </Modal>
  )
}

const styles = {
  form: 'w-80 h-4/5 px-5 flex flex-col gap-4 justify-center text-md',
  label: 'text-blue-500 font-semibold',
  field: 'flex flex-col gap-1',
  input: 'bg-gray-200 dark:bg-neutral-600 rounded py-1 px-2 outline-none',
  select:
    'bg-gray-200 dark:bg-neutral-600 rounded py-1 px-2 max-h-22 outline-none overflow-y-scroll',
  error: 'text-red-400 text-xs',
  submit:
    'px-2 py-1 w-40 self-center rounded text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-600',
}

export default Form
