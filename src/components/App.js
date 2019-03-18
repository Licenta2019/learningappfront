import React, {Component} from 'react';
import { mainRoutes } from './../routes/mainRoutes';
import {Col} from 'reactstrap';
import Header from './shared/Header';
import Footer from './shared/Footer';

class App extends Component {

    render(){
        return (
            <div>
                <Header/>
                <Col>
                    {mainRoutes}
                </Col>
                <Footer/>
            </div>
        );
    }
}

export default App;