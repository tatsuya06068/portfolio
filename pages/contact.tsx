import Menu from 'components/header'
import Title from 'components/title'
import Head from 'next/head'
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
    },
    textField: {
        margin: 'auto',
        maxWidth: theme.spacing(90),
    },
    Field: {
        margin: theme.spacing(2,0),
    },
    btn: {
        display: 'block',
        margin: 'auto',
        padding: theme.spacing(1,4),
        letterSpacing: theme.spacing(1)
    },
    errMsg: {
        color: 'red',
    }
  })
)

const { useState } = React;

const Contact = () => {
    const [EmailError, setEmailError] = useState("");
    const [SubjectError, setSubjectError] = useState("");
    const [BodyError, setBodyError] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const SendClick = async () => {
        const errorFlg: boolean = InputCheck();
        if(errorFlg) return;
        
        fetch(process.env.NEXT_PUBLIC_CONTACT_URL, 
            {  
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "X-WRITE-API-KEY":process.env.NEXT_PUBLIC_WRITE_API_KEY
                },
                body:JSON.stringify({"title":subject,'email':email,'body':body})
            }
        )
        .then(function(res){
            if(res.ok)
            {
                alert("送信完了しました。");
                window.location.href = "/";
            }
            else
            {
                alert("送信に失敗しました。")
            }
        }) 
    } 

    const InputCheck = () => {

        const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        let flg: boolean;

        if(email.length === 0 || !regexp.test(email))
        {
            flg = true;
            setEmailError("メールアドレスを入力してください。") ;
        }
        else
        {
            setEmailError("");
        }

        if(subject.length === 0)
        {
            flg = true;
            setSubjectError("件名を入力してください。");
        }
        else
        {
            setSubjectError("");
        }

        if(body.length === 0)
        {
            flg = true;
            setBodyError("本文を入力してください。");
        }
        else
        {
            setBodyError("");
        }

        return flg;
    }

    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Head>
                <title>Portfolio-Contact</title>
            </Head>
            <Menu />
            <Title title='Contact' />

            <form className={classes.textField}>
                <span className={classes.errMsg}>{EmailError}</span>
                <FormControl fullWidth variant="outlined" className={classes.Field}>
                    <InputLabel>メールアドレス</InputLabel>
                    <OutlinedInput id="email" labelWidth={110} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <span className={classes.errMsg}>{SubjectError}</span>
                <FormControl fullWidth variant="outlined" className={classes.Field} >
                    <InputLabel>件名</InputLabel>
                    <OutlinedInput id="subject"labelWidth={30} onChange={(e) => setSubject(e.target.value)} />
                </FormControl>

                <span className={classes.errMsg}>{BodyError}</span>
                <FormControl fullWidth variant="outlined" className={classes.Field}>
                    <InputLabel>本文</InputLabel>
                    <OutlinedInput id="body"labelWidth={30} multiline rows={8} onChange={(e) => setBody(e.target.value)} />
                </FormControl>
                <Button type='button' variant='outlined' className={classes.btn} onClick={SendClick}>Send</Button>
            </form>

        </div>
    )
};
export default Contact