import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { getPlayers } from '@queries/players'

const Voting = () => {
  const { data, loading, error } = useQuery(getPlayers)
  const [voting, setVoting] = useState(null)

  useEffect(() => {
    if (!data?.getPlayers) return
    setVoting({
      data: data?.getPlayers?.map(({ id, name }) => ({ id, name, vote: false })),
      trues: 0,
    })
  }, [data])

  const changeVoting = id => {
    setVoting(state => {
      let player
      const trues = []
      const falses = []
      for (const p of state.data) {
        if (p.id === id) {
          player = { ...p, vote: !p.vote }
          continue
        }
        if (p.vote) {
          trues.push(p)
          continue
        }
        falses.push(p)
      }
      if (player.vote) return { data: [...falses, ...trues, player], trues: trues.length }
      return { data: [...falses, player, ...trues], trues: trues.length }
    })
  }

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        'loading...'
      ) : error ? (
        error.message
      ) : data.getPlayers.length === 0 ? (
        'No players... Add one!'
      ) : (
        <>
          <h3 className={styles.header}>
            Voting
            {voting && <span className={styles.count}>{`${voting.trues}/${voting.data.length}`}</span>}
          </h3>
          <div className={styles.list}>
            {voting?.data.map(p => (
              <div key={p.id} className={styles.item} onClick={e => changeVoting(p.id)}>
                {` ${p.name}`}
                <input
                  type='checkbox'
                  checked={p.vote}
                  onChange={e => changeVoting(p.id)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  mainContainer:
    'min-w-96 max-sm:w-4/5 max-md:w-3/5 w-2/5 h-full py-2 flex flex-col gap-4 items-center',
  header: 'w-full flex flex-row justify-between items-center text-4xl',
  count: 'text-lg',
  list: 'w-4/5 max-lg:w-full h-full flex flex-col gap-1 items-center overflow-y-scroll',
  item: `w-full px-5 py-1 flex flex-row justify-between align-center rounded bg-neutral-100
        hover:text-blue-500 active:bg-blue-500 active:text-white`,
}

export default Voting
