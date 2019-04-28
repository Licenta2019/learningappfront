import React, { Component } from 'react';
import LoginForm from './LoginForm';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import routePaths from './../../routes/routePaths';
import { withRouter } from 'react-router-dom';
import { setAuthorizationToken } from '../helpers/login';
import { throwSubmissionError } from '../helpers/errors';

class LoginContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        return axiosClient.post(apiPaths.login, {
            username: values.username,
            password: values.password
        })
            .then((response) => {
                setAuthorizationToken(response.data.jwtToken);
                this.props.history.push(routePaths.homepage);
            })
            .catch((err) => {
                throwSubmissionError(err.response.data.message);
            });
    }

    render() {
        return (
            <LoginForm
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default withRouter(LoginContainer);
