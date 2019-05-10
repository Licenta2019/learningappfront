import React, { Component } from 'react';
import { mainRoutes } from './../routes/mainRoutes';
import { Col } from 'reactstrap';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { IntlProvider } from 'react-intl';

import { RenderIfAuthenticated } from './shared/RenderIfAuthenticated';
import { RenderIfNotAuthenticated } from './shared/RenderIfNotAuthenticated';
import { noAuthRoutes } from '../routes/noAuthRoutes';

import BurgerMenu from './shared/BurgerMenu';
import LanguageComutator from './shared/LanguageComutator';
import { i18config } from './helpers/language';

class App extends Component {

    render() {

        // console.log(i18config);

        return (
            <IntlProvider locale={i18config.locale} messages={i18config.messages} defaultLocale={i18config.default}>
                <div>
                    <Header />
                    <RenderIfAuthenticated>
                        <Col>
                            <LanguageComutator />
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
