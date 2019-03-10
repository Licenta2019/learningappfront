import React, { Component } from 'react';
import LoginForm from './LoginForm';
import axiosClient from './../axios/axiosClient';
import {apiPaths} from './../routes/apiPaths';

class LoginContainer extends Component{

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){        
        values.preventDefault();
        
        axiosClient.post("/login", {
            username : values.target.username.value,
            password : values.target.password.value
        })
        .then(()=>{
            console.log("logged in");
        })
        .catch((err)=> {
            console.log(err);
        });
    }

    render() {
        return (
            <LoginForm
                handleSubmit = {this.handleSubmit}
            />
        );
    }
}

export default LoginContainer;
