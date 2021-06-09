import { pokemonList } from "@/data/pokemonList";

import { Heading, Image, Box, Center } from "@chakra-ui/react";
import { Howl } from "howler";
import { getGridSize } from "@/utils/useWindowDimensions";

const getImagePath = (index: number) => `/pokemonImages/475/webp/${index}.webp`;

const PokemonImage = (path: string, onClick: () => any) => (
  <Image src={path} alt="me" width={"100%"} height={"auto"} onClick={onClick} />
);

const Item = ({ columnIndex, rowIndex, style }) => {
  const index = rowIndex * getGridSize().columnCount + columnIndex + 1;
  const pokemon = pokemonList[index - 1];

  const speechName = () => speech(index);
  return (
    <div style={style}>
      <Box w="100%" onClick={speechName}>
        {pokemon ? PokemonImage(getImagePath(index), speechName) : <></>}
        <Center>
          <Heading mb={5}>{pokemon.name_ja}</Heading>
        </Center>
      </Box>
    </div>
  );
};

const speech = (index: number) =>
  new Howl({ src: [`/pron/${index}.mp3`] }).play();

export default Item;
