// import Pokedex from "pokedex-promise-v2";
// import { Pokemon } from "../pokedex-promise-v2.types";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";

import { pokemonList } from "@/data/dist/pokemonList";
import PokemonItem from "@/components/PokemonItem";
import { getGridSize } from "@/utils/useWindowDimensions";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: "64px",
      height: "100vh",
    },
  })
);

export default function PokemonGrid() {
  const classes = useStyles();
  const { columnCount, columnWidth, rowHeight } = getGridSize();

  return (
    <div className={classes.root}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={height}
            rowCount={Math.ceil(pokemonList.length / columnCount)}
            rowHeight={rowHeight}
            width={width}
          >
            {PokemonItem}
          </FixedSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
}
