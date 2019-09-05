import React, { Component } from 'react';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import routePaths from './../../routes/routePaths';
import { withRouter } from 'react-router-dom';
import { setAuthorizationToken } from '../helpers/login';
import { throwSubmissionError } from '../helpers/errors';
import { authenticateUser } from '../../localStorage';
import { injectIntl } from 'react-intl';
import RegisterForm from './RegisterForm';

class RegisterContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        return axiosClient.post(apiPaths.register, {
            username: values.username,
            password: values.password
        })
            .then((response) => {
                setAuthorizationToken(response.data.jwtToken);

                authenticateUser(response.data);
                this.props.history.push(routePaths.homepage);
            })
            .catch((err) => {
                throwSubmissionError(err.response.data.message);
            });
    }

    render() {
        return (
            <RegisterForm
                onSubmit={this.handleSubmit}
                intl={this.props.intl}
            />
        );
    }
}

export default injectIntl(withRouter(RegisterContainer));
