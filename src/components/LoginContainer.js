import React, { Component } from 'react';
import LoginForm from './LoginForm';
import axiosClient from './../axios/axiosClient';
import {apiPaths} from './../routes/apiPaths';
import routePaths from './../routes/routePaths';
import {withRouter} from 'react-router-dom';

class LoginContainer extends Component{

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){        
        // values.preventDefault();
        
        console.log(values);
        console.log(values.username);
        
        axiosClient.post("/login", {
            username : values.username,
            password : values.password
        })
        .then(()=>{
        // this.props.history.push(routePaths.homepage);
        })
        .catch((err)=> {
            console.log(err);
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
