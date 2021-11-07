import Head from 'next/head'
import Menu from 'components/header'
import Title from 'components/title'
import {client} from 'libs/client'
import {HomeType} from 'types/home'
import React from 'react'
import { InferGetStaticPropsType } from 'next'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub';
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    image: {
    width: '8em',
    height: '7em',
    background: '#67A6EB',
    borderRadius: '100%',
    },
     paper: {
      maxWidth: 300,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      wordBreak: 'break-word',
    },
    text:{
      letterSpacing: theme.spacing(0.6),
      lineHeight: theme.spacing(0.2),
      
      '& $pre' :{
        whiteSpace: 'pre-wrap'
      }
    },
    Typography: {
      fontFamily: [
        'Helvetica Neue',
        'Arial',
        'Hiragino Kaku Gothic ProN',
        'Hiragino Sans',
        'sans-serif',
      ].join(),
    },
    github:{
      color: 'black'
    },
    twitter:{
      color: 'skyblue'
    },
    blog:{
      color: 'dodgerblue'
    },
    font:{
      fontSize: 1
    }
    
  }),
  );
interface Contents {
  contents: HomeType[]
}

export const getStaticProps = async () => {
  const data: Contents = await client.get({ endpoint: "home" });
  return {
    props: {
      posts: data.contents,
    },
    revalidate: 5,
  };
};

function Home({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Head>
        <title>Portfolio-Profile</title>
      </Head>

      <main>
        <Menu />
        <Title title="Profile" />
        <Grid 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        > 
        {posts.map((p) => (
          <div key={p.id}>
            <Grid 
              container
              direction="column"
              justifyContent="center" 
              alignItems="center"
              >
              <Grid item sm={12} xs={12} >
                <img src={p.image.url} className={classes.image} />
              </Grid>

              <Grid item sm={12} xs={12} >
                <Typography variant="h5" component="div" align='center' >
                  <span className={classes.text}>{p.name}</span>
                </Typography>
              </Grid>
            </Grid>
            
            <Grid container 
              direction="row"
              justifyContent="center" 
              alignItems="flex-start"
            >
              <Grid item xs={10} sm={6} zeroMinWidth>
                <Typography>
                  <span className={classes.text}>
                    {p.selfIntroduction.split('\n').map((str, idx) => (
                      <p key={idx}><pre>{str}</pre></p>
                    ))}
                  </span>

                </Typography>
              </Grid>
            </Grid> 
            
            <Grid 
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={5}
            >
              {p.twitterURL ?
                <Grid item>
                  <a href={p.twitterURL} target="_blank" rel="noopener noreferrer">
                    <TwitterIcon fontSize='large' className={classes.twitter} />
                  </a>
                  <p className={classes.font}>Twitter</p>
                </Grid> : ''
              }
              { p.githubURL ?
                <Grid item>
                  <a href={p.githubURL} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon fontSize='large' className={classes.github} />
                  </a>
                  <p className={classes.font}>Github</p>
                  </Grid> : ''                
              }
              { p.blogURL ?
                <Grid item>
                  <a href={p.blogURL} target="_blank" rel="noopener noreferrer">
                    <DescriptionIcon fontSize="large" className={classes.blog} />
                  </a>
                  <p className={classes.font}>&ensp;blog</p>
                  </Grid> : ''                
              }
            </Grid>
          </div>
        ))}
        </Grid>
      </main>
    </div>
  )
}

export default Home
