import React from 'react'
import { client } from "libs/client";
import { InferGetStaticPropsType } from "next";
import Head from 'next/head'
import Title from 'components/title'
import {WorkType} from 'types/work'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Menu from 'components/header'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import  GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
          flexGrow: 1,
          overflow: 'hidden',
          wordBreak: 'break-word',
        },
        media: {
            height: 0,
            backgroundSize: 'cover',
            paddingTop: '50%',
        },
        card: {
            maxWidth: '50em',
            margin: 'auto',
            marginBottom: theme.spacing(3)
        },
        text:{
            letterSpacing: theme.spacing(1),
            lineHeight: theme.spacing(0.3),
            margin: theme.spacing(2,0),
            '& $pre' :{
                whiteSpace: 'pre-wrap'
            }
        },
        expand: {
            transform: 'rotate(0deg)',
            margin: 'auto',
            textAlign: 'center',
            transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    sorce: {
        margin: theme.spacing(3, 0)
    }
    })
)

interface Contents {
    contents: WorkType[]
}

export const getStaticProps = async () => {
    const data: Contents = await client.get({ endpoint: "work" });
    return{
        props: {
            posts: data.contents,
        },
        revalidate: 5,
    };
};



function Work({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Head>
                <title>Portfolio-Production</title>
            </Head>
            
            <main>
                <Menu />
                <Title title="Production" />
                
                {posts.map((p, idx) => (
                    <Card key={idx} className={classes.card} >
                        <CardMedia
                            className={classes.media}
                            image={p.image.url}
                            title="img" 
                        />
                        <CardContent>
                            <Typography align='center' variant='h4'>
                                <Link href={p.siteURL}>
                                    {p.title}  
                                </Link>
                            </Typography>
                            <Typography align='center' variant='h6' className={classes.sorce} >
                                <GitHubIcon />
                            <Link href={p.gitURL}>
                                Sorce
                            </Link>
                            </Typography>
                            <Typography className={classes.text}>
                                {p.description.split('\n').map((str, idx) => (
                                    str.indexOf('https') >= 0?
                                        <Link key={idx}>{str}</Link>
                                    :
                                         <p key={idx}><pre>{str}</pre></p>
                                ))}
                            </Typography>
                            <Typography component='span' className={classes.text}>
                                {p.detail.split('\n').map((str, idx) => (
                                    <p key={idx}><pre>{str}</pre></p>
                                ))}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    )
}
export default Work