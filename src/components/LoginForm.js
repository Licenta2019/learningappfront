import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import {FormGroup , Button} from 'reactstrap';

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
        
        console.log("render");

        const {username , password} = this.state;
        const {handleSubmit} = this.props;

        return (
        <form onSubmit = {handleSubmit}>
            <FormGroup>
                <div>Username:
                     <input type="text"
                                    name = "username"
                                    onChange = {this.handleUsernameOnChange}>
                     </input>
                </div>
            </FormGroup>
            
            <FormGroup>
            <div>Password:
                 <input 
                        type="text" 
                        name = "password"
                        onChange = {this.handlePasswordOnChange}>
                 </input> 
                    </div>
            </FormGroup>
            <Button type = "Submit">Login</Button>
        </form>);
    }
}

export default reduxForm({
    form: 'loginForm',
    fields: ['username','password']
  })(LoginForm)
