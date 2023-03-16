import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner'
import Card from '@/components/card'
import { fetchFootballPitches } from '../lib/football-pitches' 

import useTrackLocation from '../hooks/use-track-location'
import { useState, useEffect, useContext } from 'react'
import { ACTION_TYPES, PitchContext } from '../store/pitch-context'

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

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation(); 

  //const [footballPitches, setFootballPitches] = useState('');

  const [footballPitchesError, setFootballPitchesError] = useState('');

  const { dispatch, state } = useContext(PitchContext);

  const { footballPitches, latLong } = state;  


  console.log({ latLong, locationErrorMsg })

  useEffect(() => {
    async function setFootballPitchesByLocation() {
      if(latLong) {
        try {
          const fetchedFootballPitches = await fetchFootballPitches(latLong, 30);
          console.log(fetchedFootballPitches);
          //setFootballPitches(fetchedFootballPitches);
          dispatch({
            type: ACTION_TYPES.SET_FOOTBALL_PITCHES,
            payload: {
               footballPitches: fetchedFootballPitches,
            }
          })

          //set football pitches
        }
        catch(error) {
          console.log(error);
          setFootballPitchesError(error.message);
        } 
      }
    }
    setFootballPitchesByLocation();
  }, [latLong])

  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
    handleTrackLocation();
  }

  return (
    <>
      <Head>
        <title>Football Pitches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText={isFindingLocation ? "Locating..." : "View pitches nearby"} handleOnClick={handleOnBannerBtnClick} />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {footballPitchesError && <p>Something went wrong: {footballPitchesError}</p>}

        {footballPitches.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Pitches near me</h2>
            <div className={styles.cardLayout}>
              {footballPitches.map(footballPitch => {
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
          </div>
        )}

        {props.footballPitches.length > 0 && (
          <div className={styles.sectionWrapper}>
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
          </div>
        )}
      </main>
    </>
  )
}
