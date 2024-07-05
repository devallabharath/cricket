import { useForm } from 'react-hook-form'
import Modal from '@generics/modal'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { getTeams } from '@queries/teams'
import { getPlayers } from '@queries/players'
import { getMatches } from '@queries/matches'
import { addMatch, editMatch } from '@mutations/matches'

const Form = ({ hide, match }) => {
  const mode = match ? 'Edit' : 'New'
  const client = useApolloClient()
  const [Add] = useMutation(addMatch)
  const [Edit] = useMutation(editMatch)
  const { data: players, loading: playerLoad, error: playerErr } = useQuery(getPlayers)
  const { data: teams, loading: teamLoad, error: teamErr } = useQuery(getTeams)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  function datetostring(date) {
    date = date ? new Date(Number(date)) : new Date()
    const offset = date.getTimezoneOffset() * 60000
    const adjusted = new Date(date.getTime() - offset)
    return adjusted.toISOString().substring(0, 16)
  }

  const onSubmit = fdata => {
    fdata = {
      ...fdata,
      timestamp: new Date(fdata.timestamp).getTime().toString(),
      common: fdata.common === 'None' ? null : Number(fdata.common),
    }
    if (mode === 'New') {
      Add({
        variables: fdata,
        update: (cache, response) => {
          const res = response.data.addMatch
          const matches = client.readQuery({ query: getMatches })?.getMatches
          if(!matches) return
          client.writeQuery({
            query: getMatches,
            data: { getMatches: [res, ...matches] },
          })
        },
        onCompleted: hide
      })
    } else {
      Edit({
        variables: { ...fdata, id: match.id },
        update: async (cache, { data: { editMatch: res } }) => {
          const matches = await client.readQuery({ query: getMatches })?.getMatches
          if(!matches) return
          client.writeQuery({
            query: getMatches,
            variables: {id: match.id},
            data: {
              getMatches: matches.map(m => {
                if (m.id === res.id) return res
                return m
              }),
            },
          })
        },
        onCompleted: (data)=>{hide(data.editMatch)}
      })
    }
  }

  const isLoading = () => playerLoad || teamLoad
  const isError = () => playerErr || teamErr

  return (
    <Modal title={mode + ' Match'} hide={hide}>
      {isLoading() ? (
        'loading...'
      ) : isError() ? (
        playerErr?.message ?? teamErr?.message
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type='datetime-local'
            className={styles.input}
            defaultValue={datetostring(match?.timestamp)}
            {...register('timestamp', { required: true })}
          />
          <div className={styles.group}>
            <div className={styles.item}>
              <label htmlFor='teamA' className={styles.label}>
                Team A
              </label>
              <select
                name='teamA'
                className={styles.select}
                defaultValue={match?.teamA.id ?? ''}
                {...register('teamA', { required: true })}
              >
                {teams.getTeams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.teamA && (
                <span className={styles.error}>This field is required</span>
              )}
              <label htmlFor='squadA' className={styles.label}>
                Squad
              </label>
              <select
                name='squadA'
                className={styles.select}
                defaultValue={match?.squadA.map(p => p.id) ?? []}
                {...register('squadA', { required: true, valueAsNumber: true })}
                multiple
              >
                {players.getPlayers.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.item}>
              <label htmlFor='teamB' className={styles.label}>
                Team B
              </label>
              <select
                name='teamB'
                className={styles.select}
                defaultValue={match?.teamB.id ?? ''}
                {...register('teamB', { required: true, valueAsNumber: true })}
              >
                {teams.getTeams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.teamB && (
                <span className={styles.error}>This field is required</span>
              )}
              <label htmlFor='squadB' className={styles.label}>
                Squad
              </label>
              <select
                name='squadB'
                className={styles.select}
                defaultValue={match?.squadB.map(p => p.id) ?? []}
                {...register('squadB', { required: true })}
                multiple
              >
                {players.getPlayers.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor='common' className={styles.label}>
              Common
            </label>
            <select
              name='common'
              className={styles.select}
              defaultValue={match?.common?.id ?? null}
              {...register('common', { required: false, valueAsNumber: true })}
            >
              <option key={100} value={null}>
                None
              </option>
              {players.getPlayers.map(player => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor='winner' className={styles.label}>
              Winner
            </label>
            <select
              name='winner'
              className={styles.select}
              defaultValue={match?.won ?? 'teamA'}
              {...register('won', { required: true })}
            >
              <option value='teamA'>Team A</option>
              <option value='teamB'>Team B</option>
            </select>
          </div>
          <div className={styles.group}>
            <div className={styles.item}>
              <input
                type='number'
                className={styles.input}
                defaultValue={match?.by ?? 1}
                {...register('by', { required: true, valueAsNumber: true })}
              />
            </div>
            <div className={styles.item}>
              <select
                className={styles.select}
                defaultValue={match?.with ?? 'Runs'}
                {...register('with', { required: true })}
              >
                <option value='Runs'>Runs</option>
                <option value='Wickets'>Wickets</option>
              </select>
            </div>
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
  form: 'w-full h-full px-3 max-sm:px-0.5 text-md flex flex-col gap-4 justify-center overflow-x-hidden overflow-y-scroll',
  label: 'text-blue-500 font-semibold',
  group:
    'w-full h-full flex flex-row gap-4 max-sm:gap-0.5 justify-center overflow-x-hidden overflow-y-scroll',
  item: 'w-2/4 flex flex-col gap-1',
  field: 'flex flex-col gap-1',
  input: 'bg-gray-200 dark:bg-neutral-600 rounded py-1 px-2 outline-none',
  select:
    'bg-gray-200 dark:bg-neutral-600 rounded py-1 px-2 max-h-24 outline-none overflow-y-scroll',
  error: 'text-red-400 text-xs',
  submit:
    'px-2 py-1 w-40 self-center rounded text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-600',
}

export default Form
