import styles from "../styles/Home.module.css";

// import Pokedex from "pokedex-promise-v2";
// import { Pokemon } from "../pokedex-promise-v2.types";
import { pokemonList } from "@/data/pokemonList";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";

import { Heading, Center } from "@chakra-ui/react";
import PokemonItem from "@/components/PokemonItem";
import { getGridSize } from "@/utils/useWindowDimensions";
import Head from "@/components/Head";
const pokemonCount = pokemonList.length;

export default function Home() {
  const { columnCount, columnWidth, rowHeight } = getGridSize();
  return (
    <div className={styles.container}>
      <Head
        title="Talking Pokédex"
        description="しゃべるポケモン図鑑"
        image={process.env.NEXT_PUBLIC_HOST + "og_image.PNG"}
        url={process.env.NEXT_PUBLIC_HOST}
      />
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
