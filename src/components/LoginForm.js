import React, { Component } from 'react';


class LoginForm extends Component{

    constructor(props){
        super(props);

        this.state= {
            username: null,
            password: null
        }

        this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
        this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    }

    handleUsernameOnChange(event){
        this.setState({
            username: event.target.value
        });
    }

    handlePasswordOnChange(event){
        this.setState({
            password: event.target.value
        });
    }

    render() {
        const {username , password} = this.state;
        const {handleSubmit} = this.props;

        return (
        <form onSubmit = {handleSubmit}>
            <div>Username: <input type="text" name = "username" onChange = {this.handleUsernameOnChange}></input> </div>
            <div>Password: <input type="text" name = "password" onChange = {this.handlePasswordOnChange}></input> </div>
            <button type="submit">Login</button>
        </form>);
    }
}

export default LoginForm;
