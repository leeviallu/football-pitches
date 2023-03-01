import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner'
import Card from '@/components/card'


export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
  }

  return (
    <>
      <Head>
        <title>Football Pitches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText="View pitches nearby" handleOnClick={handleOnBannerBtnClick} />
        <Card 
          name={"Itkonniemen jalkapallokenttä"} 
          imgUrl={"/../public/static/Itkonniemen-jalkapallokenttä.jpeg"} 
          href={"/football-pitch/itkonniemen-jalkapallokentta"} 
        />
      </main>
    </>
  )
}
