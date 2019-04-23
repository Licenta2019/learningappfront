import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import { slide as Menu } from 'react-burger-menu';

import './mainPage.css';

class MainPageContainer extends Component {

    // constructor(props){
    //     super(props);
    // }

    render() {
        const toNewQuestionPath = pathToRegexp.compile(routePaths.newQuestion);
        const toQuestionPath = pathToRegexp.compile(routePaths.listQuestions);

        return (
            // <div>
            //    -- MainPageContainer --
            // <Link
            //     to={ {
            //         pathname: toNewQuestionPath({
            //         }) } }>
            //         <div>addQuestion</div>
            // </Link>
            // <Link
            //     to={ {
            //         pathname: toQuestionPath({
            //         }) } }>
            //         <div>viewQuestions</div>
            // </Link>
            // </div>

            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
            </Menu>


        );
    }
}

export default MainPageContainer;
