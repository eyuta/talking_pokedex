// import Pokedex from "pokedex-promise-v2";
// import { Pokemon } from "../pokedex-promise-v2.types";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";

import { pokemonList } from "@/data/dist/pokemonList";
import PokemonItem from "@/components/PokemonItem";
import { getGridSize } from "@/utils/useWindowDimensions";

const pokemonCount = pokemonList.length;

export default function PokemonGrid() {
  const { columnCount, columnWidth, rowHeight } = getGridSize();
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={height}
          rowCount={Math.ceil(pokemonCount / columnCount)}
          rowHeight={rowHeight}
          width={width}
        >
          {PokemonItem}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
}
