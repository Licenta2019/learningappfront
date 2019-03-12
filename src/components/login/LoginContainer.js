import React, { Component } from 'react';
import LoginForm from './LoginForm';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import routePaths from './../../routes/routePaths';
import {withRouter} from 'react-router-dom';

class LoginContainer extends Component{

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){        

        
        axiosClient.post(apiPaths.login, {
            username : values.username,
            password : values.password
        })
        .then(()=>{
        this.props.history.push(routePaths.homepage);
        })
        .catch((err)=> {
            console.log(err + 'eroare');
        });
    }

    render() {
        return (
            <LoginForm
                onSubmit = {this.handleSubmit}
            />
        );
    }
}

export default withRouter(LoginContainer);
