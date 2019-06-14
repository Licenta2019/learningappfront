import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderField } from '../shared/renders';
import { Button, Label } from 'reactstrap';
import '../question/question.css';

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

// const asyncValidate = async (values, dispatch, props, field) => {
//     const { intl, asyncErrors } = props;
//   };


class ProfileForm extends Component {

    render() {

        const { username, email, error, handleSubmit, intl } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="subjectDiv">
                    <Label>
                        {intl.formatMessage({ id: 'label.form.username' })}
                    </Label>
                    <div>
                        <Field
                            name="username"
                            component={renderField}
                            value={username}
                        />
                    </div>

                    <div className="subjectDiv">
                        <Label>
                            {intl.formatMessage({ id: 'label.form.oldPassword' })}
                        </Label>
                        <Field
                            name="oldPassword"
                            component={renderField}
                        // type="password"
                        />
                    </div>

                    <div className="subjectDiv">
                        <Label>
                            {intl.formatMessage({ id: 'label.form.password' })}
                        </Label>
                        <Field
                            name="password"
                            component={renderField}
                            type="password"
                        />
                    </div>

                    <div className="subjectDiv">
                        <Label>
                            {intl.formatMessage({ id: 'label.form.email' })}
                        </Label>
                        <Field
                            name="email"
                            component={renderField}
                            value={email}
                        />
                    </div>

                    {/* <div className="loginDiv">
                        <Field
                            name="notificationsEnabled"
                            component={renderField}
                            value={notificationsEnabled}
                            type="checkbox"
                        />
                    </div> */}
                    {error !== undefined && <div className="text-danger">{error}</div>}

                    <Button type="Submit" className="loginButton">
                        {intl.formatMessage({ id: "label.button.update" })}
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
