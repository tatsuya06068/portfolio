import React from 'react'
import Head from 'next/head'
import Menu from 'components/header'
import Title from 'components/title'

export const Skill = (): JSX.Element => (
    <div>
        <Head>
            <title>Skill</title>
        </Head>
        
        <main>
            <Menu />

            <Title title="Skill" />


        </main>
    </div>
)
export default Skill