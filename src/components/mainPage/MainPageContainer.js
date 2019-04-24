import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import routePaths from '../../routes/routePaths';
// import pathToRegexp from 'path-to-regexp';
// import { slide as Menu } from 'react-burger-menu';
import BurgerMenu from '../shared/BurgerMenu';

import './mainPage.css';

class MainPageContainer extends Component {

    // constructor(props){
    //     super(props);
    // }

    render() {

        return (
           <div>
               <BurgerMenu />
           </div>
        );
    }
}

export default MainPageContainer;
