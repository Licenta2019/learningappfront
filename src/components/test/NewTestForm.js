import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { renderField, renderSelect } from '../shared/renders';
import { Button, Label, FormGroup, Row } from 'reactstrap';
import { mapOptions, mapLabels } from '../helpers/selectHelper';
import '../question/question.css';

const validate = (values, props) => {

    let errors = {};
    const { testName, subject } = values;

    const { intl } = props;

    if (!testName)
        errors.testName = intl.formatMessage({ id: 'label.error.testName.required' });

    if (!subject)
        errors.subject = intl.formatMessage({ id: 'label.error.subject.required' });

    errors.topics = [];
    if (!values.topics) {
        errors.topics._error = intl.formatMessage({ id: 'label.error.topics.length' });

        console.log("nu sunt topice");
    }
    else {
        console.log("sunt topice");

        const topicsErrors = [];

        values.topics.forEach((topic, index) => {
            const topicErrors = {}
            if (topic.topic === "") {
                topicErrors.topic = intl.formatMessage({ id: 'label.error.topic.required' });
            }
            if (topic.questionsNumber === "") {
                topicErrors.questionsNumber = intl.formatMessage({ id: 'label.error.questionsNumber.required' });
            }
            if (topic.difficulty === undefined) {
                topicErrors.difficulty = intl.formatMessage({ id: 'label.error.dificulty.required' });
            }
            topicsErrors[index] = topicErrors;
        })
        if (topicsErrors.length)
            errors.topics = topicsErrors;
    }

    return errors;
}

const renderTopics = (intl, topics, difficulties, { fields, meta: { error, submitFailed } }) => (
    <ul className="ulContainer">
        {fields.map((topic, index) => (
            <li className="liAnswer" key={index}>
                <label className="liLabel">
                    {intl.formatMessage({ id: 'placeholder.form.topic' })}{index + 1}
                </label>
                <div className="answerDiv">
                    <Label>
                        {intl.formatMessage({ id: "label.message.topic" })}
                    </Label>

                    <div>
                        <Field
                            name={`${topic}.topic`}
                            component={renderSelect}
                            id={index}
                            placeholder={intl.formatMessage({ id: 'placeholder.form.topic' })}
                            options={mapOptions(topics)} />
                    </div>

                    <Label>
                        {intl.formatMessage({ id: "label.message.questionsNumber" })}
                    </Label>

                    <div>
                        <Field
                            name={`${topic}.questionsNumber`}
                            component={renderField}
                            id={index} />
                    </div>

                    <Label>
                        {intl.formatMessage({ id: "label.message.difficulty" })}
                    </Label>

                    <div>
                        <Field
                            name={`${topic}.difficulty`}
                            component={renderSelect}
                            id={index}
                            placeholder={intl.formatMessage({ id: 'placeholder.form.difficulty' })}
                            options={mapLabels(difficulties)} />
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

        const { handleSubmit, handleSubjectOnChange, subjects, error, intl, topicDisabled, topics, difficulties } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="newQuestionDiv">

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
                                component={renderTopics.bind(this, intl, topics, difficulties)}
                            />
                        </div>
                    }

                    {error !== undefined && <div className="text-danger">{error}</div>}

                    <div className='submitButtonDiv'>
                        <Button type="submit" className="submitButton">
                            {intl.formatMessage({ id: "label.button.addTest" })}
                        </Button>
                    </div>

                </div>

            </form>
        );
    }
}

export default reduxForm({
    form: 'newTestForm',
    validate
})(NewTestForm)
