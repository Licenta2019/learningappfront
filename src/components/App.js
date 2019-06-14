import React, { Component } from 'react';
import { mainRoutes } from './../routes/mainRoutes';
import { Col } from 'reactstrap';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { IntlProvider } from 'react-intl';

import { RenderIfAuthenticated } from './shared/RenderIfAuthenticated';
import { RenderIfNotAuthenticated } from './shared/RenderIfNotAuthenticated';
import { RenderIfShouldNotify } from './shared/RenderIfShouldNotify';
import NotificationsContainer from './shared/NotificationsContainer';

import { noAuthRoutes } from '../routes/noAuthRoutes';

import BurgerMenu from './shared/BurgerMenu';
import { i18config } from './helpers/language';

class App extends Component {

    render() {

        return (
            <IntlProvider locale={i18config.locale} messages={i18config.messages} defaultLocale={i18config.default}>
                <div>
                    <Header />
                    <RenderIfAuthenticated>
                        <Col>
                            <RenderIfShouldNotify>
                                <NotificationsContainer />
                            </RenderIfShouldNotify>
                            <BurgerMenu />
                            {mainRoutes}
                        </Col>
                    </RenderIfAuthenticated>

                    <RenderIfNotAuthenticated>
                        <Col>
                            {noAuthRoutes}
                        </Col>
                    </RenderIfNotAuthenticated>
                    <Footer />
                </div>
            </IntlProvider>
        );
    }
}

export default App;
