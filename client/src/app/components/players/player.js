import { useNavigate } from 'react-router-dom'
import { FaUserLarge, FaPhone } from 'react-icons/fa6'

const Player = ({ player }) => {
  const navigate = useNavigate()
  const gotoProfile = () => {
    navigate(player.id, { state: player })
  }
  return (
    <div className={styles.container} onClick={gotoProfile}>
      <div className={styles.property}>
        <FaUserLarge />
        <span>{player.name}</span>
      </div>
      <div className={styles.property}>
        <FaPhone />
        <span>{player.phone}</span>
      </div>
    </div>
  )
}

const styles = {
  container:
    'w-full py-2 px-4 text-sm rounded flex flex-row bg-white dark:bg-neutral-500 hover:text-blue-600 cursor-pointer border hover:border-blue-500',
  property: 'w-2/4 flex flex-row gap-2 items-center',
}

export default Player
