import Head from 'next/head'
import Menu from 'components/header'
import Typography from '@material-ui/core/Typography'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
    </Head>

    <main>
      <Menu />

      <Typography variant="h4">
        Home
      </Typography>

    </main>
  </div>
)

export default Home
