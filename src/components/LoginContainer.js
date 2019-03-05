import React, { Component } from 'react';
import LoginForm from './LoginForm';
class LoginContainer extends Component{

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(value){
        alert(value.value.password);
        console.log(value.password);
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
