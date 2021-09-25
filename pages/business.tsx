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
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(() => 
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            wordBreak: 'break-word',
        },
        list: {
            width: '100%',
            maxWidth: '45em',
            '& .item':{
                '&:nth-child(odd)':{
                    background: '#EEEEEE' 
                }   
            },
        },
        detail:{
            paddingBottom: '1em', 
            '& $pre' :{
                whiteSpace: 'pre-wrap'
            }
        },
        title:{
            paddingTop: '1em',
            paddingBottom: '1em',
            fontWeight: 'bold'
        }
    })
);
interface Contents{
    contents: PracticeType[]
}

export const getStaticProps = async ()=> {
    const data: Contents = await client.get({ endpoint: "business"});
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

                <Title title="Business" />

                <Grid 
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography >
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
                    <div className={classes.list}>
                        {posts.map((p, idx) => (    
                            <div key={idx} className='item'>
                                <Grid item sm={12} xs={12}>
                                    <Typography align='center' variant='h6' className={classes.title}>
                                        {p.apptitle}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12} xs={12}>
                                    <Typography
                                        align='center'
                                        variant='body1'    
                                    >
                                        {p.language}
                                        <br />
                                        {p.flamework.length == 0 ? "" : p.flamework}
                                    </Typography>
                                </Grid>
                                <Divider />
                                <Grid item sm={12} xs={12}>
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
                            </div>
                        ))}
                    </div>
                </Grid>
                
            </main>
        </div>
    )
}
export default Practice;