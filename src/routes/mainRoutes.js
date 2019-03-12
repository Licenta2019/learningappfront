import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routePaths from './routePaths';
import LoginContainer from '../components/login/LoginContainer';
import MainPageContainer from '../components/mainPage/MainPageContainer';
import NewQuestionContainer from '../components/question/NewQuestionContainer';

export const mainRoutes = (
    <Switch>
      <Route exact path={ routePaths.login } component={ LoginContainer }/>    
      <Route exact path={ routePaths.homepage } component={ MainPageContainer }/>
      <Route exact path={routePaths.newQuestion} component={NewQuestionContainer}/>
    </Switch>
);