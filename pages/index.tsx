import Head from 'next/head'
import Menu from 'components/header'
import Avatar from '@material-ui/core/Avatar'
import Title from 'components/title'
import {client} from 'libs/client'
import {HomeType} from 'types/home'
import React from 'react'
import { InferGetStaticPropsType } from 'next'
import TwitterIcon from '@material-ui/icons/Twitter'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => 
  createStyles({
    image: {
    display: 'inline-block',
    width: '15%',
    height: '50%',
    background: '#67A6EB',
    borderRadius: '100%',
    },
  }),
  );
interface Contents {
  contents: HomeType[]
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data: Contents = await client.get({ endpoint: "home" });
  return {
    props: {
      posts: data.contents,
    },
  };
};

function Home({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();
  return(
    <div className="container">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <Menu />
      
        <Title title="Home" />
        
        {posts.map((p) => (
          <p key={p.id}>
            <Grid container>
              <Grid item>
              {p.name}
              </Grid>
              <Grid item>
                <img src={p.image.url} className={classes.image} />
              </Grid>
              <span>
                {p.selfIntroduction}
              </span>
              <span>
                {p.githubURL}
              </span>
              <a href={p.twitterURL} target="_blank" rel="noopener noreferrer">
                <TwitterIcon fontSize='large' />
              </a>
            </Grid>
          </p>
        ))}
        
      </main>
    </div>
  )
}

export default Home
