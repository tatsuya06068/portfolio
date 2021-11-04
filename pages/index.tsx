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
import GitHubIcon from "@material-ui/icons/GitHub";
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation, Pagination]);

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
            maxWidth: '70em',
            margin: 'auto',
            marginBottom: theme.spacing(3)
        },
        text:{
            fontSize: theme.spacing(2.4),
            letterSpacing: theme.spacing(0.6),
            lineHeight: theme.spacing(0.2),
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
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            loop={true}
                            pagination={{ clickable: true }}
                        >
                            <SwiperSlide>
                            <CardMedia
                            className={classes.media}
                            image={p.image1.url}
                            title="img" 
                            />
                            </SwiperSlide>
                            <SwiperSlide>
                            <CardMedia
                            className={classes.media}
                            image={p.image2.url}
                            title="img" 
                            />
                            </SwiperSlide>
                            <SwiperSlide>
                            <CardMedia
                            className={classes.media}
                            image={p.image3.url}
                            title="img" 
                            />
                            </SwiperSlide>
                            
                        </Swiper>
                        <CardContent>
                            <Typography align='center' variant='h4'>
                                {p.siteURL === undefined ? p.title :
                                    <Link href={p.siteURL}>
                                        {p.title}  
                                    </Link>
                                }
                            </Typography>
                            <Typography align='center' variant='h6' className={classes.sorce} >
                                <GitHubIcon />
                            <Link href={p.gitURL}>
                                Sorce
                            </Link>
                            </Typography>
                            <Typography variant='h5'>
                                {p.head1}
                            </Typography>
                            <Typography className={classes.text}>
                                {p.description1.split('\n').map((str, idx) => (
                                    str.indexOf('https') >= 0?
                                        <Link key={idx}>{str}</Link>
                                    :
                                         <p key={idx}><pre>{str}</pre></p>
                                ))}
                            </Typography>
                            {!(p.description2 === undefined) ? 
                                <div>
                                    <Typography variant='h5'>
                                        {p.head2}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        {p.description2.split('\n').map((str, idx) => (
                                        str.indexOf('https') >= 0?
                                            <Link key={idx}>{str}</Link>
                                        :
                                             <p key={idx}><pre>{str}</pre></p>
                                        ))}
                                    </Typography>
                                </div>
                            :null
                            }
                            {!(p.description3 === undefined) ? 
                                <div>
                                    <Typography variant='h5'>
                                        {p.head3}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        {p.description3.split('\n').map((str, idx) => (
                                        str.indexOf('https') >= 0?
                                            <Link key={idx}>{str}</Link>
                                        :
                                             <p key={idx}><pre>{str}</pre></p>
                                        ))}
                                    </Typography>
                                </div>
                            :null
                            }
                            {!(p.description4 === undefined) ? 

                                <div>
                                    <Typography variant='h5'>
                                        {p.head4}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        {p.description4.split('\n').map((str, idx) => (
                                        str.indexOf('https') >= 0?
                                            <a href={str}>ブログ</a>
                                        :
                                             <p key={idx}><pre>{str}</pre></p>
                                        ))}
                                    </Typography>
                                </div>
                            :null
                            }
                            {!(p.description5 === undefined) ? 
                                <div>
                                    <Typography variant='h5'>
                                        {p.head2}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        {p.description5.split('\n').map((str, idx) => (
                                        str.indexOf('https') >= 0?
                                            <Link key={idx}>{str}</Link>
                                        :
                                             <p key={idx}><pre>{str}</pre></p>
                                        ))}
                                    </Typography>
                                </div>
                            :null
                            } 
                            {!(p.description6 === undefined) ? 
                                <div>
                                    <Typography variant='h5'>
                                        {p.head6}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        {p.description6.split('\n').map((str, idx) => (
                                        str.indexOf('https') >= 0?
                                            <Link key={idx}>{str}</Link>
                                        :
                                             <p key={idx}><pre>{str}</pre></p>
                                        ))}
                                    </Typography>
                                </div>
                            :null
                            }
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    )
}
export default Work