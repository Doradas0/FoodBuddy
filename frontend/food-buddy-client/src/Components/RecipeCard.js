import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import RecipeDefault from "../Res/Img/RecipeDefault.jpg";

const useStyles = makeStyles(theme=>({
  smCard: {
    maxWidth: 345,
  },
  card:{
    maxWidth: theme.breakpoints.values.sm,
  },
  media: {
    height: 140,
    opacity: 0.5,
  },
  smContent: {
    display: "none"
  },
  content: {
    backgroundColor: "red",
  }
}));

export default function RecipeCard(props){
  console.log(props);

  const classes = useStyles();
  const [small, setSmall] = useState(!props.large);

  return(
    <Card
      className={`${small && classes.smCard} ${classes.card}`}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={RecipeDefault}
          title="Contemplative Reptile"
        />
        <CardContent
          className={`${small && classes.smContent} ${classes.content}`}
        >
          Content
        </CardContent>
      </CardActionArea>
    </Card>
  )

}
