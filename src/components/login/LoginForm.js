import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import {Button} from 'reactstrap';

// const renderTextField = ({ input, meta: { touched, error }, ...props }) => {

//     return (
//       <div>
//         <input
//           { ...input }
//           { ...props }
//         />
//         { touched && (error && <span className="text-danger">{ error }</span>) }
//       </div>
//     )
//   };
  
const validate = (values, props) => {
    const errors = {};

    if (!values.username) {
      errors.username = "error.form.username.required";
    }
    
    if (!values.password) {
      errors.password = "error.form.password.required";
    }
    
    return errors;
};
  

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
            <div>
                <Field 
                name = "username"
                component = "input"
                type = "text"
                value = {username}
                onChange = {this.handleUsernameOnChange}
                placeholder = "username"
                />
            </div>
            <div>
                <Field 
                name = "password"
                component = "input"
                type = "text"
                value = {password}
                onChange = {this.handlePasswordOnChange}
                placeholder = "password"
                />
            </div>
            <Button type = "Submit">Login</Button>
        </form>
        );
    }
}

export default reduxForm({
    form: 'loginForm',
    fields: ['username','password'],
    validate
  })(LoginForm)
