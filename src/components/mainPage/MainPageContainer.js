import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';

class MainPageContainer extends Component{

    // constructor(props){
    //     super(props);
    // }

    render(){
        const toNewQuestionPath = pathToRegexp.compile(routePaths.newQuestion);
        const toQuestionPath = pathToRegexp.compile(routePaths.listQuestions);
         
        return (
        <div>
           -- MainPageContainer --
        <Link
            to={ {
                pathname: toNewQuestionPath({
                }) } }>
                <div>addQuestion</div>
        </Link>
        <Link
            to={ {
                pathname: toQuestionPath({
                }) } }>
                <div>viewQuestions</div>
        </Link>
        </div>
        );
    }
}

export default MainPageContainer;
