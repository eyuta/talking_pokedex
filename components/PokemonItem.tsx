import { pokemonList } from "@/data/pokemonList";

import { Heading, Image, Box, Center } from "@chakra-ui/react";
import { Howl } from "howler";
import { getGridSize } from "@/utils/useWindowDimensions";
import { useState } from "react";

const getImagePath = (index: number) => `/pokemonImages/475/webp/${index}.webp`;

const Item = ({ columnIndex, rowIndex, style }) => {
  const index = rowIndex * getGridSize().columnCount + columnIndex + 1;
  const pokemon = pokemonList[index - 1];
  const name = pokemon ? pokemon.name_ja : "";

  const [playing, setPlaying] = useState(false);
  const playSound = async () => {
    if (playing) return;
    setPlaying(true);
    await speech(index);
    setPlaying(false);
  };

  return (
    <div style={style}>
      <Box w="100%" onClick={playSound}>
        {pokemon ? (
          <Image
            src={getImagePath(index)}
            alt={name}
            width={"100%"}
            height={"auto"}
          />
        ) : (
          <></>
        )}
        <Center>
          <Heading mb={5}>{name}</Heading>
        </Center>
      </Box>
    </div>
  );
};

const speech = (index: number) =>
  new Promise<void>((resolve) => {
    new Howl({
      src: [`/pron/${index}.mp3`],
      autoplay: true,
      onend() {
        resolve();
      },
    });
  });

export default Item;
