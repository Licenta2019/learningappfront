import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import { throwSubmissionError } from '../helpers/errors';
import routePaths from './../../routes/routePaths';
import { injectIntl } from 'react-intl';
import { getUser } from '../../localStorage';
import ProfileForm from './ProfileForm';
import { withRouter } from "react-router";

class ProfileContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: null
        }

        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        axiosClient.get(apiPaths.getUpdateUser.replace('{}', getUser().id))
            .then((user) => {
                this.setState({
                    userData: user.data
                });
            })
            .catch(exc => {
                throwSubmissionError(exc);
            })
    }

    updateUser(values) {

        axiosClient.put(apiPaths.getUpdateUser.replace('{}', this.state.userData.id), {
            username: values.username,
            oldPassword: values.oldPassword,
            password: values.password,
            email: values.email,
            notificationsEnabled: values.notificationsEnabled
        })
            .then(() => {
                this.props.history.push(routePaths.homepage);
            })
            .catch((exc) => {
                throwSubmissionError(exc);
            })
    }

    render() {
        const { userData } = this.state;

        return (
            <div>
                {
                    userData && <ProfileForm
                        initialValues={{
                            username: userData.username,
                            password: userData.password,
                            notificationsEnabled: userData.notificationsEnabled,
                            email: userData.email
                        }}
                        intl={this.props.intl}
                        onSubmit={this.updateUser}
                    />
                }
            </div>
        );
    }
}

export default injectIntl(withRouter(ProfileContainer));
