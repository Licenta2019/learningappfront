import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { renderField, renderSelect } from '../shared/renders';
import { Button, Label } from 'reactstrap';
import { mapOptions } from '../helpers/selectHelper';
import '../question/question.css';


//TODO(Paul) include validations for this component!!
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

const renderTopics = (intl, onChangeSelect, topics, { fields, meta: { error, submitFailed } }) => (
    <ul className="ulContainer">
        {fields.map((topic, index) => (
            <li className="liAnswer" key={index}>
                <label className="liLabel">
                    {intl.formatMessage({ id: 'placeholder.form.topic' })}{index + 1}
                </label>
                <div className="answerDiv">
                    <div className="selectDiv">
                        <Field
                            name={`${topic}.topic`}
                            component={renderSelect}
                            id={index}
                            placeholder={intl.formatMessage({ id: 'placeholder.form.topic' })}
                            options={mapOptions(topics)}
                            onChange={onChangeSelect} />
                    </div>
                    <div className="inputDiv">
                        <Field
                            name={`${topic}.questionsNumber`}
                            component={renderField}
                            id={index} />
                    </div>
                </div>
                <button
                    className="removeButton"
                    type="button"
                    title="Remove"
                    onClick={() => fields.remove(index)}
                >{intl.formatMessage({ id: 'label.button.remove' })}</button>
            </li>
        ))}
        <li className="liButton">
            <button className="addButton" type="button" onClick={() => fields.push({
                topic: "",
                questionsNumber: 1
            })}>
                {intl.formatMessage({ id: 'label.button.addTopic' })}
            </button>
        </li>
        {submitFailed && error && <div>{error}</div>}
    </ul>
)

class NewTestForm extends Component {

    render() {

        const { handleSubmit, handleTopicOnChange, handleSubjectOnChange, subjects, error, intl, topicDisabled, topics } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="subjectDiv">

                    <div className="subjectDiv">
                        <Label>
                            {intl.formatMessage({ id: 'label.message.name' })}
                        </Label>
                        <Field
                            name="testName"
                            component={renderField}
                        />
                    </div>

                    <div className="subjectDiv">
                        <Label>
                            {intl.formatMessage({ id: 'label.message.subject' })}
                        </Label>
                        <Field
                            name="subject"
                            placeholder={intl.formatMessage({ id: 'placeholder.form.subject' })}
                            component={renderSelect}
                            onChange={handleSubjectOnChange}
                            options={mapOptions(subjects)}
                        />
                    </div>

                    {!topicDisabled &&
                        <div className="answerDiv">
                            <FieldArray
                                name="topics"
                                component={renderTopics.bind(this, intl, handleTopicOnChange, topics)}
                            />
                        </div>
                    }

                    {error !== undefined && <div className="text-danger">{error}</div>}

                    <Button type="Submit" className="loginButton">
                        {intl.formatMessage({ id: "label.button.addTest" })}
                    </Button>
                </div>

            </form>
        );
    }
}

export default reduxForm({
    form: 'newTestForm',
    validate
})(NewTestForm)
