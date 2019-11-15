import React, {Fragment} from 'react';
import Header from "./Header";
import Routes from "../Libs/Routes";
import CssBaseline from '@material-ui/core/CssBaseline';

export default props =>
  <Fragment>
    <CssBaseline />
    <Header children="Test"/>
    <Routes />
  </Fragment>
