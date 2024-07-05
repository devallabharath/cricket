import { useQuery } from '@apollo/client'
import { getQuickInfo } from '@queries/quickInfo'
import Match from '@components/matches/match'

const Home = () => {
  const { data, loading, error } = useQuery(getQuickInfo)

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <span className={styles.title}>Quick Links</span>
        <div className={styles.links}>
          <a href='/players' className={styles.link}>
            Players:
            <span className={styles.count}>{data?.getQuickInfo.counts.players}</span>
          </a>
          <a href='/teams' className={styles.link}>
            Teams:
            <span className={styles.count}>{data?.getQuickInfo.counts.teams}</span>
          </a>
          <a href='/matches' className={styles.link}>
            Matches:
            <span className={styles.count}>{data?.getQuickInfo.counts.matches}</span>
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <span className={styles.title}>Recent Match</span>
        {loading ? (
          'loading...'
        ) : error ? (
          error.message
        ) : (
          <Match match={data.getQuickInfo.match} />
        )}
      </div>
      <div className={styles.container}>
        <span className={styles.title}>Tools</span>
        <div className={styles.links}>
          <a href='/voting' className={styles.link}>
            Voting
          </a>
        </div>
      </div>
    </div>
  )
}

const styles = {
  mainContainer:
    'w-3/6 max-lg:w-4/6 max-md:w-5/6 max-sm:w-full h-full flex flex-col gap-3 p-2',
  container: 'flex flex-col rounded border border-neutral-300',
  title: 'font-semibold text-lg max-md:text-sm max-sm:text-sm  px-2',
  links: 'flex flex-wrap gap-3 p-1',
  subContainer: 'flex flex-row gap-1',
  link: 'flex flex gap-1 items-center justify-center hover:text-blue-500 active:text-blue-700 p-2 bg-white rounded border hover:border-blue-500',
  count: 'text-gray-500',
}

export default Home
