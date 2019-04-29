import React, { Component } from 'react';
import { mainRoutes } from './../routes/mainRoutes';
import { Col } from 'reactstrap';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { IntlProvider } from 'react-intl';

import messages_ro from '../lang/ro.json';
import messages_en from '../lang/en.json';
import { RenderIfAuthenticated } from './shared/RenderIfAuthenticated';
import { RenderIfNotAuthenticated } from './shared/RenderIfNotAuthenticated';
import { noAuthRoutes } from '../routes/noAuthRoutes';

import BurgerMenu from './shared/BurgerMenu';

const messages = {
    'ro': messages_ro,
    'en': messages_en
};

const language = navigator.language.split(/[-_]/)[0]; //language without region code

class App extends Component {

    render() {

        return (
            <IntlProvider locale={language} messages={messages[language]}>
                <div>
                    <Header />
                    <RenderIfAuthenticated>
                        <Col>
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
