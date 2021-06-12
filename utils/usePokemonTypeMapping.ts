import { Howl } from "howler";

import { pokemonList } from "@/data/dist/pokemonList";
import pokemonTypeMapping from "@/data/dist/pokemonTypeMapping.json";
import { pokemonTypes } from "@/data/dist/pokemonTypes";

const getSpeech = (filename: string) => () =>
  new Promise<void>((resolve) => {
    new Howl({
      src: [filename],
      autoplay: true,
      onend() {
        resolve();
      },
    });
  });

const getImagePath = (filename: string) =>
  `/pokemonImages/475/webp/${filename}.webp`;

const toUpperLetterCase = (str: string) => str[0].toUpperCase() + str.slice(1);

const getTypes = (name: string) => {
  const pokemon = pokemonTypeMapping.data.pokemon.find(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );
  if (!pokemon) return [];
  return pokemon.pokemon_v2_pokemontypes.map((type) => {
    const pokemonType = pokemonTypes.find(
      (pokemonType) => pokemonType.name_en === type.pokemon_v2_type.name
    );
    const typeName = toUpperLetterCase(pokemonType.name_en);
    return {
      ...pokemonType,
      imagePath: `pokemonTypeImages/${typeName}.png`,
      speech: getSpeech(`pron/type/${typeName}.mp3`),
    };
  });
};

export const usePokemonItem = (index: number) => {
  const pokemon = pokemonList[index - 1];
  if (pokemon === undefined) return {};

  const pokemonIndex = String(index).padStart(3, "0");
  const name = pokemon.name_ja;
  const imagePath = getImagePath(pokemonIndex);
  const speech = getSpeech(`/pron/pokemon/${pokemonIndex}.mp3`);
  const types = getTypes(pokemon.name_en);
  return { name, imagePath, speech, types };
};
