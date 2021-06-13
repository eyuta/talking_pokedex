import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import Button from "@material-ui/core/Button";

import { getGridSize } from "@/utils/useWindowDimensions";
import React, { useState } from "react";
import { usePokemonItem } from "@/utils/usePokemonTypeMapping";
import { Avatar, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "40%",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },
}));

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

  const pokemonItem = usePokemonItem(index);
  const [playing, setPlaying] = useState(false);
  const classes = useStyles();

  const playSound = async () => {
    if (playing) return;
    setPlaying(true);
    await pokemonItem?.speech?.();
    setPlaying(false);
  };

  return (
    <div style={style}>
      <Card className={classes.root}>
        {pokemonItem.name ? (
          <>
            <img
              onClick={playSound}
              className={classes.cover}
              alt={pokemonItem.name}
              height="100%"
              src={pokemonItem.imagePath}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Button onClick={playSound}>
                  <Typography component="h5" variant="h5">
                    <Grid container direction="row" alignItems="center">
                      {pokemonItem.name}
                      <VolumeUpRoundedIcon className={classes.icon} />
                    </Grid>
                  </Typography>
                </Button>

                {pokemonItem.types?.map((t, i) => (
                  <Typography variant="subtitle1" color="textSecondary" key={i}>
                    <Button onClick={t.speech}>
                      <Grid container direction="row" alignItems="center">
                        <Avatar
                          alt={t.name_ja}
                          src={t.imagePath}
                          className={[classes.small, classes.icon].join(" ")}
                        />
                        {t.name_ja}
                      </Grid>
                    </Button>
                  </Typography>
                ))}
              </CardContent>
            </div>
          </>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default Item;
