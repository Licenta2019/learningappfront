import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import redLogo from '../../assets/images/redLogo2.png';
import home from '../../assets/images/home2.png';
import logout from '../../assets/images/logout.png';
import settings from '../../assets/images/settings.png';
import profile from '../../assets/images/profile.png';
import menu from '../../assets/images/menu.png';
import './burgerMenu.css';

class BurgerMenu extends Component {
    
    handleStateChange(newState) {
    window.setTimeout(() => {
      if (newState.isOpen) {
        document.activeElement.blur();
      }
    });
  }

  render() {
    
    const toNewQuestionPath = pathToRegexp.compile(routePaths.newQuestion);
    const toQuestionPath = pathToRegexp.compile(routePaths.listQuestions);
    const toHomePagePath = pathToRegexp.compile(routePaths.homepage);
    const toLoginPagePath = pathToRegexp.compile(routePaths.login);

    return(   
        <Menu onStateChange={this.handleStateChange}>
                <div className="menuLogoDiv">
                    <img src={redLogo} alt="Logo" />
                </div>
                <div className="menuSeparatorDiv"/>
                <Link
                    to={ {
                        pathname: toHomePagePath({
                        }) } }>
                        <div className="menu-item">
                            <img src={home} alt="Logo" />
                            <h5>HOME</h5>
                        </div>
                </Link>
                <Link
                    to={ {
                        pathname: toHomePagePath({
                        }) } }>
                        <div className="menu-item">
                            <img src={profile} alt="Logo" />
                            <h5>PROFILE</h5>
                        </div>
                </Link>
                <Link
                    to={ {
                        pathname: toHomePagePath({
                        }) } }>
                        <div className="menu-item">
                            <img src={menu} alt="Logo" />
                            <h5>QUESTIONS MENU</h5>
                        </div>
                </Link>
                <Link
                    to={ {
                        pathname: toNewQuestionPath({
                        }) } }>
                        <div className="menu-item">
                            <img src={home} alt="Logo" />
                            <h5>ADD QUESTION</h5>
                        </div>
                </Link>
                <Link
                    to={ {
                        pathname: toQuestionPath({
                        }) } }>
                        <div className="menu-item">
                            <img src={home} alt="Logo" />
                            <h5>VIEW QUESTIONS</h5>
                        </div>
                </Link>
                <Link
                    to={ {
                        pathname: toLoginPagePath({
                        }) } }>
                        <div className="menu-item">
                            <img src={home} alt="Logo" />
                            <h5>VALIDATE QUESTION</h5>
                        </div>
                </Link>
                <Link
                    to={ {
                        pathname: toLoginPagePath({
                        }) } }>
                        <div className="menu-item">
                            <img src={settings} alt="Logo" />
                            <h5>SETTINGS</h5>
                        </div>
                </Link>
                <Link
                    to={ {
                        pathname: toLoginPagePath({
                        }) } }>
                        <div className="menu-item">
                            <img src={logout} alt="Logo" />
                            <h5>LOGOUT</h5>
                        </div>
                </Link>
            </Menu>
    );
  }
  
}

export default BurgerMenu;
