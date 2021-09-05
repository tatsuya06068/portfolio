import React from 'react'
import Head from 'next/head'
import Menu from 'components/header'
import Typography from '@material-ui/core/Typography'

export const Skill = (): JSX.Element => (
    <div>
        <Head>
            <title>Skill</title>
        </Head>
        
        <main>
            <Menu />
            <span>skill</span>
        </main>
    </div>
)
export default Skill