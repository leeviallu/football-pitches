import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner'
import Card from '@/components/card'

import footballPitchesData from "../data/football-pitches.json"

export async function getStaticProps(context) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3MQ5aC0WWH5be7RqgaTn500UnWf+k5Y2+NgwUKSGVgu8='
    }
  };
  
  const response = await fetch(
    'https://api.foursquare.com/v3/places/search?query=football&ll=62.89991149673169%2C27.717305647045922&limit=6', 
    options
  );
  const data = await response.json();
  console.log(data.results);
  //  .catch(err => console.error(err));

  return {
    props: {
      footballPitches: data.results,
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
                    key={footballPitch.fsq_id}
                    name={footballPitch.name } 
                    imgUrl={footballPitch.imgUrl || "/../public/static/football-pitch.jpeg"} 
                    href={`/football-pitch/${footballPitch.fsq_id}`}
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
