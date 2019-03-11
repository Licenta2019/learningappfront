import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routePaths from './routePaths';
import MainPageContainer from '../components/MainPageContainer';

export const mainRoutes = (
    <Switch>
      <Route exact path={ routePaths.homepage } component={ MainPageContainer }/>
    </Switch>
);
  