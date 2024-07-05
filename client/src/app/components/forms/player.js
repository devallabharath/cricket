import { useForm } from 'react-hook-form'
import Modal from '@generics/modal'
import { useMutation, useApolloClient } from '@apollo/client'
import { getPlayers } from '@queries/players'
import { addPlayer, editPlayer } from '@mutations/players'

const Form = ({ hide, data }) => {
  const mode = data ? 'Edit' : 'New'
  const client = useApolloClient()
  const [Add] = useMutation(addPlayer)
  const [Edit] = useMutation(editPlayer)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (fdata, mode) => {
    if (mode === 'New') {
      Add({
        variables: fdata,
        update: (cache, response) => {
          const res = response.data.addPlayer
          const players = client.readQuery({ query: getPlayers })?.getPlayers
          if(!players) return
          client.writeQuery({
            query: getPlayers,
            data: { getPlayers: [...players, res] },
          })
        },
      })
    } else {
      Edit({
        variables: { id: data.id, ...fdata },
        update: (cache, response) => {
          const res = response.data.editPlayer
          const players = client.readQuery({ query: getPlayers })?.getPlayers
          if(!players) return
          client.writeQuery({
            query: getPlayers,
            data: {
              getPlayers: players.map(p => {
                if (p.id === res.id) return res
                return p
              }),
            },
          })
        },
      })
    }
    hide()
  }
  return (
    <Modal title={mode + ' Player'} hide={hide}>
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
            defaultValue={data?.name ?? ''}
            {...register('name', { required: true })}
          />
          {errors.name && <span className={styles.error}>This field is required</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor='ph' className={styles.label}>
            Phone
          </label>
          <input
            id='ph'
            className={styles.input}
            defaultValue={data?.phone ?? ''}
            {...register('phone', { required: true })}
          />
          {errors.ph && <span className={styles.error}>This field is required</span>}
        </div>
        <button className={styles.submit} type='submit'>
          Submit
        </button>
      </form>
    </Modal>
  )
}

const styles = {
  form: 'w-80 px-5 text-md flex flex-col gap-4 justify-center',
  label: 'text-blue-500 font-semibold',
  field: 'flex flex-col gap-1',
  input: 'bg-gray-200 dark:bg-neutral-600 rounded py-1 px-2 outline-none',
  error: 'text-red-400 text-xs',
  submit:
    'px-2 py-1 w-40 self-center rounded text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-600',
}

export default Form
