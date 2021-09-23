import React from 'react'
import Head from 'next/head'
import Menu from 'components/header'
import Title from 'components/title'
import {client} from 'libs/client'
import { createStyles, makeStyles} from '@material-ui/core/styles'
import {PracticeType} from 'types/practice'
import { InferGetStaticPropsType } from 'next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(() => 
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            wordBreak: 'break-word',
        },
        list: {
            width: '45em',
            '& .item':{
                '&:nth-child(odd)':{
                    background: '#EEEEEE' 
                }   
            },
        },
        detail:{
            '& $pre' :{
                whiteSpace: 'pre-wrap'
            }
        },
        title:{
            fontWeight: 'bold',
            fontSize: '1.1em'
        }
    })
);
interface Contents{
    contents: PracticeType[]
}

export const getStaticProps = async ()=> {
    const data: Contents = await client.get({ endpoint: "practice"});
    return{
        props: {
            posts: data.contents,
        },
        revalidate: 5,
    }
}

function Practice({posts}: InferGetStaticPropsType<typeof getStaticProps>){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Head>
                <title>Portfolio-Practice</title>
            </Head>

            <main>
                <Menu />

                <Title title="Practice" />

                <Grid 
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant='h6'>
                            実務で使用した技術・作成機能
                        </Typography>
                    </Grid>
                </Grid>            

                <Grid 
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                <List className={classes.list}>
                    {posts.map((p, idx) => (    
                        <div key={idx} className='item'>
                            <ListItem>
                                <Grid item sm={12} xs={6}>
                                    <Typography align='center' className={classes.title}>
                                        {p.apptitle}
                                    </Typography>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid item sm={12} xs={6}>
                                    <Typography
                                        align='center'>
                                    {p.language}
                                    <br />
                                    {p.flamework}
                                    </Typography>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid item sm={12} xs={6}>
                                    <Divider />
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        className={classes.detail}
                                    >
                                        {p.detail.split('\n').map((str, idx) => (
                                            <p key={idx}>
                                                <pre>{str}</pre>
                                            </p>
                                        ))}
                                    </Typography>
                                </Grid>
                            </ListItem>
                       </div>
                    ))}
                </List>
                </Grid>

            </main>
        </div>
    )
}
export default Practice;