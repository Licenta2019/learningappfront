import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'reactstrap';
import { renderField } from '../shared/renders';

import './login.css';

import whiteLogo from '../../assets/images/whiteLogo.png';
import usernameLogo from '../../assets/images/username.png';
import passwordLogo from '../../assets/images/password.png';
import arrowLogo from '../../assets/images/arrow.png'

const validate = (values, props) => {
    const errors = {};

    const { intl } = props;

    if (!values.username) {
        errors.username = intl.formatMessage({ id: "label.error.username.required" });
    }

    if (!values.password) {
        errors.password = intl.formatMessage({ id: "label.error.password.required" });
    }

    return errors;
};


class LoginForm extends Component {

    constructor(props) {
        super(props);

        console.log(this.props.intl);

        this.state = {
            username: null,
            password: null
        }
    }

    render() {

        const { username, password } = this.state;
        const { handleSubmit, error, intl } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="mainLoginDiv">

                    <div className="logoDiv">
                        <img src={whiteLogo} alt="Logo" />
                    </div>

                    <div className="loginDiv">
                        <div className="usernameDiv">
                            <img src={usernameLogo} alt="UsernameLogo" />
                            <Field
                                name="username"
                                component={renderField}
                                value={username}
                                placeholder={intl.formatMessage({ id: "placeholder.form.username" })}
                            />
                        </div>

                        <div className="passwordDiv">
                            <img src={passwordLogo} alt="PasswordLogo" />
                            <Field
                                name="password"
                                component={renderField}
                                value={password}
                                placeholder={intl.formatMessage({ id: "placeholder.form.password" })}
                                type="password"
                            />
                        </div>
                        {error !== undefined && <div className="text-danger">{error}</div>}

                        <Button type="Submit" className="loginButton">
                            {intl.formatMessage({ id: "label.button.login" })}
                        </Button>
                    </div>

                    <div className="footerDiv">
                        <label className="notMemberLabel">
                            {intl.formatMessage({ id: "label.user.notMember" })}
                        </label>
                        <label className="signUpLabel">
                            {intl.formatMessage({ id: "label.user.signup" })}
                        </label>
                        <img src={arrowLogo} alt="arrowLogo" />
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'loginForm',
    fields: ['username', 'password'],
    validate
})(LoginForm)
