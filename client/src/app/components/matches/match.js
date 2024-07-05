import { useNavigate } from 'react-router-dom'
import { FaThumbsUp } from 'react-icons/fa6'
import { MdDateRange } from 'react-icons/md'
import { BiStats } from 'react-icons/bi'

const src = id => require(`../../assets/images/teams/${id}.jpeg`)

const datetostring = date => {
  date = new Date(Number(date))
  return date.toString().slice(4, 21)
}

const Match = ({ match }) => {
  const navigate = useNavigate()
  const { timestamp, teamA, teamB, won, by } = match

  const gotoMatch = () => {
    navigate(`/matches/${match.id}`, {state: match})
  }

  return (
    <div className={styles.container} onClick={gotoMatch}>
      <div className={styles.team}>
        <img className={styles.logo} src={src(teamA.id)} alt='some' />
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <MdDateRange className={styles.icon} />: {datetostring(timestamp)}
        </div>
        <div className={styles.detail}>
          <FaThumbsUp className={styles.icon} />: {match[won].name}
        </div>
        <div className={styles.detail}>
          <BiStats className={styles.icon} />: {`By ${by} ${match.with}`}
        </div>
      </div>
      <div className={styles.team}>
        <img className={styles.logo} src={src(teamB.id)} alt='some' />
      </div>
    </div>
  )
}

const styles = {
  container:
    'w-full flex flex-row text-black dark:text-white bg-white dark:bg-neutral-900 rounded justify-between cursor-pointer border-2 hover:border-blue-500',
  logo: 'w-32 max-lg:w-32 max-md:w-28 max-sm:w-24 rounded',
  details:
    'w-[calc(100%-theme(spacing.72))] max-sm:w-[calc(100%-theme(spacing.44))] p-1 flex flex-col justify-evenly max-sm:text-xs',
  detail: 'w-full flex flex-row items-center',
  icon: 'text-blue-500',
  buttons: 'w-full text-sm flex flex-row gap-2 px-2 items-center justify-evenly',
  edit: 'w-fit p-1 max-sm:p-0.5 flex flex-row gap-0.5 items-center rounded bg-neutral-300 hover:text-blue-500 active:bg-blue-500 active:text-neutral-100',
  delete:
    'w-fit p-1 max-sm:p-0.5 flex flex-row gap-0.5 items-center rounded bg-neutral-300 hover:text-red-500 active:bg-red-500 active:text-neutral-100',
}

export default Match
