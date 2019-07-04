import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routePaths from './routePaths';
import LoginContainer from '../components/login/LoginContainer';
import MainPageContainer from '../components/mainPage/MainPageContainer';
import NewQuestionContainer from '../components/question/NewQuestionContainer';
import QuestionContainer from '../components/question/QuestionContainer';
import UpdateQuestionContainer from '../components/question/UpdateQuestionContainer';
import ProfileContainer from '../components/profile/ProfileContainer';
import NewTestContainer from '../components/test/NewTestContainer';
import TestContainer from '../components/test/TestContainer';
import TakeTestContainer from '../components/test/TakeTestContainer';
import SettingsContainer from '../components/settings/SetingsContainer';
import RegisterContainer from '../components/register/RegisterContainer';

export const mainRoutes = (
  <Switch>
    <Route exact path={routePaths.login} component={LoginContainer} />
    <Route exact path={routePaths.homepage} component={MainPageContainer} />
    <Route exact path={routePaths.newQuestion} component={NewQuestionContainer} />
    <Route exact path={routePaths.listQuestions} component={QuestionContainer} />
    <Route exact path={routePaths.updateQuestion} component={UpdateQuestionContainer} />
    <Route exact path={routePaths.profile} component={ProfileContainer} />
    <Route exact path={routePaths.newTest} component={NewTestContainer} />
    <Route exact path={routePaths.listTests} component={TestContainer} />
    <Route exact path={routePaths.getTest} component={TakeTestContainer} />
    <Route exact path={routePaths.settings} component={SettingsContainer} />
    <Route exact path={routePaths.register} component={RegisterContainer} />
  </Switch>
);
