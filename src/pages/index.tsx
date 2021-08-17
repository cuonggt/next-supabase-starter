import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
    </>
  )
}

export default Home
