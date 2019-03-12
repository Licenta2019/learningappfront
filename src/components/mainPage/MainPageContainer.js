import React, { Component } from 'react';
import NewQuestionContainer from '../question/NewQuestionContainer';
import { Link } from 'react-router-dom'
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';

class MainPageContainer extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const toQuestionPath = pathToRegexp.compile(routePaths.newQuestion);

        return (
        <div>
           -- MainPageContainer --
        <Link
            to={ {
                pathname: toQuestionPath({
                }) } }>
                <div>click</div>
        </Link>
        </div>
        );
    }
}

export default MainPageContainer;
