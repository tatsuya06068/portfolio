import React from 'react'
import { client } from "libs/client";
import { InferGetStaticPropsType } from "next";
import Head from 'next/head'
import Title from 'components/title'
import {BlogType} from 'types/blog'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Menu from 'components/header'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
          flexGrow: 1,
          overflow: 'hidden',
          wordBreak: 'break-word',
        },
        card: {
            marginBottom: 12,
            padding: theme.spacing(2, 0),
            maxWidth: theme.spacing(80),
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        topics: {
            margin: theme.spacing(1)
        },
        item: {
            marginLeft: theme.spacing(2),
            padding: theme.spacing(0.4),
            borderRadius: theme.spacing(1),
            backgroundColor: '#BBBBBB',
            color: 'white'
        }
    })
)

interface Contents {
    contents: BlogType[]
}

export const getStaticProps = async () => {
    const data: Contents = await client.get({ endpoint: "blog" });
    return{
        props: {
            posts: data.contents,
        },
        revalidate: 5,
    };
};



function Blog({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Head>
                <title>Portfolio-Blog</title>
            </Head>
            
            <main>
                <Menu />
                <Title title="Blog" />
                
                {posts.map((p, idx) => (
                    <Card key={idx} className={classes.card} >
                        <CardContent>
                            <Typography align='center' variant='h5'>
                                <Link href={p.url}>
                                    {p.name}  
                                </Link>
                            </Typography>
                            <Typography align='center' className={classes.topics}>
                                {p.topics.split(',').map((t, idx) =>    (
                                    <span className={classes.item} key={idx}>{t}</span>
                                ))}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    )
}
export default Blog