import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner'
import Card from '@/components/card'

import footballPitchesData from "../data/football-pitches.json"
import { fetchFootballPitches } from "../lib/football-pitches"

export async function getStaticProps(context) {
  const footballPitches = await fetchFootballPitches();

  return {
    props: {
      footballPitches,
    }
  }
}


export default function Home(props) {
  console.log("props:", props)

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
        {props.footballPitches.length > 0 && (
          <>
            <h2 className={styles.heading2}>Kuopion jalkapallokentät</h2>
            <div className={styles.cardLayout}>
              {props.footballPitches.map(footballPitch => {
                return (
                  <Card 
                    alt={footballPitch.name}
                    key={footballPitch.id}
                    name={footballPitch.name } 
                    imgUrl={footballPitch.imgUrl || "/../public/static/football-pitch.jpeg"} 
                    href={`/football-pitch/${footballPitch.id}`}
                    className={styles.card}
                  />
                  )})}
            </div>
          </>
        )}
      </main>
    </>
  )
}
