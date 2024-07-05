import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from '@components/navbar/navbar'
import Home from '@components/home/home'
import Players from '@components/players/players'
import Player from '@components/players/profile'
import Teams from '@components/teams/teams'
import Matches from '@components/matches/matches'
import Match from '@components/matches/profile'
import Voting from '@components/voting/voting'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/players', element: <Players /> },
  { path: '/players/:id', element: <Player /> },
  { path: '/teams', element: <Teams /> },
  { path: '/matches', element: <Matches /> },
  { path: '/matches/:id', element: <Match /> },
  { path: '/voting', element: <Voting /> },
])

const App = () => {
  return (
    <div className={styles.body}>
      <Navbar className={styles.navbar} />
      <div className={styles.content}>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

const styles = {
  body: 'w-dvw h-dvh dark:text-white dark:bg-neutral-600 light:bg-slate-200',
  navbar: 'h-4',
  content: `w-dvw h-[calc(100dvh-theme(spacing.12))] max-sm:h-[calc(100dvh-theme(spacing.20))] bg-gray-300 flex justify-center dark:bg-neutral-700
  text-md max-sm:text-sm px-10 max-sm:p-1`,
}

export default App
