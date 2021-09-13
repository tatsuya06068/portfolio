import React from 'react'
import Head from 'next/head'
import Menu from 'components/header'
import Title from 'components/title'
import {client} from 'libs/client'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {PracticeType} from 'types/practice'
import { InferGetStaticPropsType } from 'next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            wordBreak: 'break-word',
        },
        list: {
            width: '50em',

            '& .item':{
                '&:nth-child(odd)':{
                    background: '#EEEEEE' 
                }   
            },
        },
        detail:{
            display: 'inline-block',
            marginLeft: theme.spacing(5)
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
    }
}

function Practice({posts}: InferGetStaticPropsType<typeof getStaticProps>){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Head>
                <title>Practice</title>
            </Head>

            <main>
                <Menu />

                <Title title="Practice" />

                <Grid 
                    container
                    direction="row"
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
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                <List className={classes.list}>
                    {posts.map((p, idx) => (    
                        <div key={idx} className='item'>
                            <ListItem>
                                <Grid item sm={4} xs={12}>
                                    <Typography
                                        align='center'>
                                    {p.language}
                                    <br />
                                    {p.flamework}
                                    </Typography>
                                </Grid>
                                
                                <Grid item sm={8} xs={12}>
                                <ListItemText
                                    primary={p.apptitle}    
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body1"
                                            align="left"
                                            className={classes.detail}
                                        >
                                            {p.detail.split(/\n/).map((f, index) => (
                                                <p key={index} >
                                                    {f}
                                                </p>
                                            ))}
                                        </Typography>
                                    }
                                />
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