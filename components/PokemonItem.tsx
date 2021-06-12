import { pokemonList } from "@/data/dist/pokemonList";

import { Heading, Image, Box, Center } from "@chakra-ui/react";
import { Howl } from "howler";
import { getGridSize } from "@/utils/useWindowDimensions";
import { useState } from "react";

const getImagePath = (filename: string) => `/pokemonImages/475/webp/${filename}.webp`;

const Item = ({
  columnIndex,
  rowIndex,
  style,
}: {
  columnIndex: number;
  rowIndex: number;
  style: object;
}) => {
  const index = rowIndex * getGridSize().columnCount + columnIndex + 1;
  const filename = String(index).padStart(3, "0");
  const pokemon = pokemonList[index - 1];
  const name = pokemon ? pokemon.name_ja : "";

  const [playing, setPlaying] = useState(false);
  const playSound = async () => {
    if (playing) return;
    setPlaying(true);
    await speech(filename);
    setPlaying(false);
  };

  return (
    <div style={style}>
      <Box w="100%" onClick={playSound}>
        {pokemon ? (
          <Image
            src={getImagePath(filename)}
            alt={name}
            width={"100%"}
            height={"auto"}
          />
        ) : (
          <></>
        )}
        <Center>
          <Heading mb={6}>{name}</Heading>
        </Center>
      </Box>
    </div>
  );
};

const speech = (filename: string) =>
  new Promise<void>((resolve) => {
    new Howl({
      src: [`/pron/pokemon/${filename}.mp3`],
      autoplay: true,
      onend() {
        resolve();
      },
    });
  });

export default Item;
