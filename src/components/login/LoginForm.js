import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'reactstrap';
import { renderField } from '../shared/renders';

const validate = (values, props) => {
    const errors = {};

    if (!values.username) {
        errors.username = "Username is required!";
    }

    if (!values.password) {
        errors.password = "Password is required!";
    }

    return errors;
};


class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null
        }
    }

    render() {

        const { username, password } = this.state;
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="username"
                        component={renderField}
                        value={username}
                        placeholder="username"
                    />
                </div>
                <div>
                    <Field
                        name="password"
                        component={renderField}
                        value={password}
                        placeholder="password"
                        type = "password"
                    />
                </div>
                <Button type="Submit">Login</Button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'loginForm',
    fields: ['username', 'password'],
    validate
})(LoginForm)
