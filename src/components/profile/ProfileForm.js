import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderField } from '../shared/renders';
import { Button, Label } from 'reactstrap';

const validate = (values, props) => {

    const errors = [];
    const { intl } = props;

    const requiredFields = [
        'username',
        'password',
        'email'
    ];

    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = intl.formatMessage({ id: `label.error.${field}.required` });
        }
    });


    return errors;
}

class ProfileForm extends Component {

    render() {
        const { username, password, email, notificationsEnabled, handleSubmit, error, intl } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="newQuestionDiv">
                    <Label>
                        {intl.formatMessage({ id: 'label.message.subject' })}
                    </Label>

                    <div className="subjectDiv">
                        <Field
                            name="username"
                            component={renderField}
                            value={username}
                            placeholder={intl.formatMessage({ id: "placeholder.form.username" })}
                        />
                    </div>

                    <div className="subjectDiv">
                        <Label>
                            {intl.formatMessage({ id: 'label.message.subject' })}
                        </Label>
                        <Field
                            name="password"
                            component={renderField}
                            value={password}
                            placeholder={intl.formatMessage({ id: "placeholder.form.password" })}
                            type="password"
                        />
                    </div>

                    <div className="subjectDiv">
                        <Label>
                            {intl.formatMessage({ id: 'label.message.subject' })}
                        </Label>
                        <Field
                            name="email"
                            component={renderField}
                            value={email}
                            placeholder={intl.formatMessage({ id: "placeholder.form.email" })}
                        />
                    </div>

                    <div className="loginDiv">
                        <Field
                            name="notificationsEnabled"
                            component={renderField}
                            value={notificationsEnabled}
                            type="checkbox"
                        />
                    </div>
                    {error !== undefined && <div className="text-danger">{error}</div>}

                    <Button type="Submit" className="loginButton">
                        {intl.formatMessage({ id: "label.button.login" })}
                    </Button>
                </div>

            </form>
        );
    }
}

export default reduxForm({
    form: 'profileForm',
    validate
})(ProfileForm)
