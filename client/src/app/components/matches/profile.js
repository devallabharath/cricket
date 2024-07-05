import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Form from '@components/forms/match'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { getMatches, getMatchByID } from '@queries/matches'
import { deleteMatch } from '@mutations/matches'
import { FaPencil, FaTrash } from 'react-icons/fa6'

const src = id => require(`../../assets/images/teams/${id}.jpeg`)

const datetostring = date => {
  date = new Date(Number(date))
  return date.toString().slice(4, 21)
}

const Match = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const client = useApolloClient()
  const [formStatus, setFormStatus] = useState(false)
  const { data, loading, error } = useQuery(getMatchByID, {
    variables: { id },
  })
  const [match, setMatch] = useState(null)
  // const match = data?.getMatchByID

  useEffect(() => {
    if (!data) {
      setMatch(state)
    } else {
      setMatch(data.getMatchByID)
    }
  }, [data])

  const Edit = () => {
    setFormStatus(true)
  }

  const closeForm = data => {
    setFormStatus(false)
    if (!data) setMatch(data)
  }

  const gotoPlayer = p => {
    navigate(`/players/${p.id}`, { state: p })
  }

  const Player = (p, i) => {
    const common = i === undefined
    return (
      <div key={i} className={common ? styles.commonPlayer : styles.player}>
        <div className={styles.playerName} onClick={() => gotoPlayer(p)}>
          {common ? p.name : `${i + 1}). ${p.name}`}
        </div>
      </div>
    )
  }

  const [Delete] = useMutation(deleteMatch, {
    variables: { id },
    update: async (cache, response) => {
      const matches = await client.readQuery({ query: getMatches }).getMatches
      if (!matches) return
      client.writeQuery({
        query: getMatches,
        data: { getMatches: matches.filter(m => m.id !== id) },
      })
    },
  })

  if (loading) return 'loading...'
  if (error) return error.message

  if (match)
    return (
      <div className={styles.container}>
        {formStatus && <Form hide={closeForm} match={match} />}
        <div className={styles.controls}>
          <span className={styles.header}>Match ID: {match.id}</span>
          <button className={styles.edit} onClick={Edit}>
            <FaPencil /> Edit
          </button>
          <button className={styles.delete} onClick={Delete}>
            <FaTrash /> Delete
          </button>
        </div>
        <div className={styles.overview}>
          <img src={src(match.teamA.id)} alt='teamA' className={styles.image} />
          <div className={styles.details}>
            <div className={styles.detail}>
              {match.teamA.captain.name} vs {match.teamB.captain.name}
            </div>
            <div className={styles.detail}>{datetostring(match.timestamp)}</div>
            <div className={styles.detail}>{match[match.won].name} Won</div>
            <div className={styles.detail}>{`By ${match.by} ${match.with}`}</div>
          </div>
          <img src={src(match.teamB.id)} alt='teamB' className={styles.image} />
        </div>
        <div className={styles.squads}>
          <div className={styles.squad}>{match.squadA.map(Player)}</div>
          <div className={styles.squad}>{match.squadB.map(Player)}</div>
        </div>
        <div className={styles.common}>
          Common:
          {match.common ? Player(match.common) : 'None'}
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
  overview: 'flex flex-row justify-between p-1 rounded bg-white dark:bg-neutral-900',
  details: 'h-full flex flex-col p-1 justify-center items-center',
  detail: 'w-full h-full flex flex-row gap-1 items-center justify-center',
  image: 'w-32 max-lg:w-32 max-md:w-28 max-sm:w-24 rounded',
  squads: 'flex flex-row gap-0.5 rounded',
  squad: 'w-2/4 p-0.5 flex flex-col rounded gap-0.5 bg-white dark:bg-neutral-900',
  player: 'w-full px-2 border-b border-gray-200',
  playerName: 'hover:text-blue-600 cursor-pointer',
  common: 'flex items-center justify-center',
  commonPlayer: 'w-full px-2 py-0.5 rounded bg-white dark:bg-neutral-900',
}

export default Match
