import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { GetStaticProps } from 'next'
import Pokedex from 'pokedex-promise-v2';
import { Pokemon } from '../pokedex-promise-v2.types'
import { pokemonList } from '@/data/pokemonList'
import { useEffect } from 'react';


import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from 'react-window';

const pokemonCount = pokemonList.length
const imageSize = 3


const getImagePath = (index: number) => `/pokemonImages/475/webp/${index}.webp`

const PokemonImage = (path: string,onClick: () => any) =>
  <Image src={path} alt="me" width="100%" height="100%" onClick={onClick} />


const generateRow = (speech: ReturnType<typeof getSpeechInstance>) => ({ columnIndex,rowIndex,style }) => {
  const index = rowIndex * imageSize + columnIndex + 1
  const pokemon = pokemonList[index - 1]
  const speechName = () => speech(pokemon.name_ja)
  const Content = pokemon ? PokemonImage(getImagePath(index),speechName) : <></>
  return (
    <div style={style}>{Content}</div>
  )
}

export default function Home(props: { data: { name: string } }) {
  useEffect(() => {
    speechSynthesis
  },[]);
  const speech = getSpeechInstance()
  return (
    <div className={styles.container}>
      <Head>
        <title>Talking Pokedex</title>
        <meta name="description" content="Talking Pokedex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        test: {JSON.stringify(props)}
        <button onClick={() => speech(props.data.name)}>test</button>
        <AutoSizer>
          {({ height,width }) => (
            <Grid
              columnCount={3}
              columnWidth={100}
              height={height}
              rowCount={pokemonCount / 3}
              rowHeight={100}
              width={width}
            >
              {generateRow(speech)}
            </Grid>
          )}
        </AutoSizer>
      </main>
    </div>
  )
}




export const getStaticProps: GetStaticProps = async context => {

  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  var P = new Pokedex();
  P.getPokemonByName(800,function (response: Pokemon,error: Error) { // with callback
    if (!error) {
      response.sprites.versions
      console.log(JSON.stringify(pokemonList[800]));

    } else {
      console.log(error)
    }
  });
  const data = { name: pokemonList[800].name_ja }
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { data }, // will be passed to the page component as props
  }
}


const loadVoice = function () {
  console.log('async',window.speechSynthesis.getVoices())
};

export const getSpeechInstance = () => {
  if (typeof window === "undefined") return;

  let utterance: SpeechSynthesisUtterance;

  return (text: string) => {
    if (!utterance) {
      utterance = new SpeechSynthesisUtterance();
      utterance.rate = 0.8;
      utterance.voice = speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang == "ja-JP")[0];
    }
    utterance.text = text;
    speechSynthesis.speak(utterance);
  };
};

