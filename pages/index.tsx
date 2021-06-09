import Head from "next/head";
import styles from "../styles/Home.module.css";

// import Pokedex from "pokedex-promise-v2";
// import { Pokemon } from "../pokedex-promise-v2.types";
import { pokemonList } from "@/data/pokemonList";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";

import { Heading, Center } from "@chakra-ui/react";
import PokemonItem from "@/components/PokemonItem";
import { getGridSize } from "@/utils/useWindowDimensions";

const pokemonCount = pokemonList.length;

export default function Home() {
  const { columnCount, columnWidth, rowHeight } = getGridSize();
  return (
    <div className={styles.container}>
      <Head>
        <title>Talking Pokedex</title>
        <meta name="description" content="Talking Pokedex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Center>
          <Heading mb={5}>ポケモンをクリック！</Heading>
        </Center>
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={pokemonCount / columnCount}
              rowHeight={rowHeight}
              width={width}
            >
              {PokemonItem}
            </Grid>
          )}
        </AutoSizer>
      </main>
    </div>
  );
}
