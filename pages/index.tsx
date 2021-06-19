import styles from "../styles/Root.module.css";

import Typography from "@material-ui/core/Typography";

import PokemonGrid from "@/components/PokemonGrid";
import Head from "@/components/Head";
import AppBar from "@/components/AppBar";

export default function Root() {
  return (
    <div className={styles.container}>
      <Head
        title="Talking Pokédex"
        description="しゃべるポケモン図鑑"
        image={process.env.NEXT_PUBLIC_HOST + "og_image.PNG"}
        url={process.env.NEXT_PUBLIC_HOST}
      />
      <main className={styles.main}>
        <AppBar />
        <PokemonGrid />
        <Typography
          variant="caption"
          display="block"
          align="center"
          gutterBottom
        >
          Pokémon images & names © 1995-2021 Nintendo/Game Freak.
        </Typography>
      </main>
    </div>
  );
}
