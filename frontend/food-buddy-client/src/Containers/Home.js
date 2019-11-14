import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


export default props => {

  return(
    <Container maxWidth="sm">
        <Typography variant="h1">Food Buddy</Typography>
        <Typography variant="subtitle1">Your personal food assistant</Typography>
    </Container>
  )
}
