import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import defaultFootballPitchImg from "../../public/static/football-pitch.jpeg"


import cls from "classnames";

import styles from "../../styles/football-pitch.module.css";
import { fetchFootballPitches } from "../../lib/football-pitches";

import { useContext, useEffect, useState } from "react";
import { PitchContext } from "../../store/pitch-context"

import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params);

  const footballPitches = await fetchFootballPitches();
  const findFootballPitchById = footballPitches.find((footballPitch) => {
    return footballPitch.id.toString() === params.foo; //dynamic id
  })
  return {
    props: {
      footballPitch: findFootballPitchById ? findFootballPitchById : {} , 
    },
  }

}

export async function getStaticPaths() {
  const footballPitches = await fetchFootballPitches();
  const paths = footballPitches.map(footballPitch => {
    return {
      params: {
        foo: footballPitch.id.toString( ),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const FootballPitch = (initialProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const id = router.query.id;

  const [footballPitch, setFootballPitch] = useState(initialProps.footballPitch);
  
  const { 
    state: {
      footballPitches
    }
  } = useContext(PitchContext);

  useEffect(() => {
    if(isEmpty(initialProps.footballPitch)) {
      if(footballPitches.length > 0) {
        const findFootballPitchById = footballPitches.find((footballPitch) => {
          return footballPitch.id.toString() === foo; //dynamic id
        })
        setFootballPitch(findFootballPitchById);
      }
    }
  }, [id])

  const { location, name, imgUrl } = footballPitch;

  const handleUpVoteButton = () => {
    console.log("handle upvote")
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
             ← Back to home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image 
            src={imgUrl || defaultFootballPitchImg} 
            width={600} 
            height={360} 
            className={styles.pitchImg} 
            alt={name}>
          </Image>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/place.svg" width="24" height="24"  />
            <p className={styles.text}>{location.address || "Unknown address"}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24"  />
            <p className={styles.text}>Unknown surface</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24"  />
            <p className={styles.text}>22</p>
          </div>
          <button className={styles.upVoteButton} onClick={handleUpVoteButton}>Up Vote</button>
        </div>
      </div>
    </div>
  );
};

export default FootballPitch;