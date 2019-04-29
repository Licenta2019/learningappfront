import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routePaths from './routePaths';
import LoginContainer from '../components/login/LoginContainer';

export const noAuthRoutes = (
    <Switch>
        <Route exact path={routePaths.login} component={LoginContainer} />
    </Switch>
)
