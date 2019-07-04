import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import redLogo from '../../assets/images/redLogo.png';
import home from '../../assets/images/home.png';
import profile from '../../assets/images/profile.png';
import menu from '../../assets/images/menu.png';
import addItem from '../../assets/images/addItem.png';
import viewList from '../../assets/images/viewList.png';
import settings from '../../assets/images/settings.png';
import logout from '../../assets/images/logout.png';
import axiosClient from '../../axios/axiosClient';
import { Badge } from 'reactstrap';

import './burgerMenu.css';
import { getUser } from '../../localStorage';
import { isProfessor } from '../helpers/user';
import { handleLogout } from '../helpers/logout';
import { injectIntl } from 'react-intl';
import apiPaths from '../../axios/apiPaths';

import { connect } from 'react-redux';

class BurgerMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionsSubMenuVisible: false,
            testSubMenuVisible: false,
            notificationsCount: 0
        }

        this.getNotificationsCount = this.getNotificationsCount.bind(this);
    }

    getNotificationsCount() {
        const user = getUser();

        return user && axiosClient.get(apiPaths.getNotificationsCount.replace('{}', user.id))
            .then((response) => {
                this.setState({
                    notificationsCount: response.data
                })
            })
    }

    componentWillReceiveProps(newProps) {
        this.getNotificationsCount();
    }

    componentDidMount() {
        this.getNotificationsCount();
    }

    handleStateChange(newState) {
        window.setTimeout(() => {
            if (newState.isOpen) {
                document.activeElement.blur();
            }
        });
    }

    render() {

        const toHomePagePath = pathToRegexp.compile(routePaths.homepage);
        const toNewQuestionPath = pathToRegexp.compile(routePaths.newQuestion);
        const toQuestionPath = pathToRegexp.compile(routePaths.listQuestions);
        const toLoginPagePath = pathToRegexp.compile(routePaths.login);
        const toProfilePagePath = pathToRegexp.compile(routePaths.profile);
        const toNewTestPath = pathToRegexp.compile(routePaths.newTest);
        const toTestPath = pathToRegexp.compile(routePaths.listTests);
        const toSettingsPath = pathToRegexp.compile(routePaths.settings);

        const { questionsSubMenuVisible, notificationsCount, testSubMenuVisible } = this.state;

        const { intl } = this.props;
        const user = getUser();

        const userRole = user && user.userRole;

        return (
            userRole !== null &&
            <Menu onStateChange={this.handleStateChange}>
                <div className="menuLogoDiv">
                    <img src={redLogo} alt="Logo" />
                </div>
                <div className="menuSeparatorDiv" />
                <Link
                    to={{
                        pathname: toHomePagePath({
                        })
                    }}>
                    <div className="menu-item">
                        <img src={home} alt="Logo" />
                        <h5>
                            {intl.formatMessage({ id: "label.menu.home" })}
                        </h5>
                    </div>
                </Link>
                <Link
                    to={{
                        pathname: toProfilePagePath({})
                    }}>
                    <div className="menu-item">
                        <img src={profile} alt="Logo" />
                        <h5>
                            {intl.formatMessage({ id: "label.menu.profile" })}
                        </h5>
                    </div>
                </Link>

                <Link to={{}} onClick={() => {
                    this.setState({
                        questionsSubMenuVisible: !questionsSubMenuVisible
                    })
                }}>
                    <div className="menu-item">
                        <img src={menu} alt="Logo" />
                        <h5>
                            {intl.formatMessage({ id: "label.menu.questions" })}
                        </h5>
                        <Badge className="ml-2">{notificationsCount}</Badge>
                    </div>
                </Link>
                {questionsSubMenuVisible && (
                    <div className="questionsSubMenuDiv">
                        {!isProfessor(userRole) && < Link
                            to={{
                                pathname: toNewQuestionPath({
                                })
                            }}>
                            <div className="sub-menu-item">
                                <img src={addItem} alt="Logo" />
                                <h5>
                                    {intl.formatMessage({ id: "label.submenu.addQuestion" })}
                                </h5>
                            </div>
                        </Link>}
                        <Link
                            to={{
                                pathname: toQuestionPath({
                                }),
                            }}
                        >
                            <div className="sub-menu-item">
                                <img src={viewList} alt="Logo" />
                                <h5>
                                    {intl.formatMessage({ id: "label.submenu.viewQuestions" })}
                                </h5>
                                <Badge>{notificationsCount}</Badge>
                            </div>
                        </Link>
                    </div>
                )}

                <Link to={{}} onClick={() => {
                    this.setState({
                        testSubMenuVisible: !testSubMenuVisible
                    })
                }}>
                    <div className="menu-item">
                        <img src={menu} alt="Logo" />
                        <h5>
                            {intl.formatMessage({ id: "label.menu.test" })}
                        </h5>
                    </div>
                </Link>
                {testSubMenuVisible && (
                    <div className="questionsSubMenuDiv">
                        {isProfessor(userRole) && < Link
                            to={{
                                pathname: toNewTestPath({
                                })
                            }}>
                            <div className="sub-menu-item">
                                <img src={addItem} alt="Logo" />
                                <h5>
                                    {intl.formatMessage({ id: "label.submenu.addTest" })}
                                </h5>
                            </div>
                        </Link>}
                        <Link
                            to={{
                                pathname: toTestPath({
                                }),
                            }}
                        >
                            <div className="sub-menu-item">
                                <img src={viewList} alt="Logo" />
                                <h5>
                                    {intl.formatMessage({ id: "label.submenu.viewTests" })}
                                </h5>
                            </div>
                        </Link>
                    </div>
                )}

                <Link
                    to={{
                        pathname: toSettingsPath({
                        })
                    }}>
                    <div className="menu-item">
                        <img src={settings} alt="Logo" />
                        <h5>
                            {intl.formatMessage({ id: "label.menu.settings" })}
                        </h5>
                    </div>
                </Link>
                <Link
                    to={{
                        pathname: toLoginPagePath({
                        })
                    }}
                    onClick={() => {
                        handleLogout();
                    }}>
                    <div className="menu-item">
                        <img src={logout} alt="Logo" />
                        <h5>
                            {intl.formatMessage({ id: "label.menu.logout" })}
                        </h5>
                    </div>
                </Link>
            </Menu >
        );
    }
}

function mapStateToProps(state) {
    return { ...state };
}

export default injectIntl(connect(mapStateToProps)(BurgerMenu));
