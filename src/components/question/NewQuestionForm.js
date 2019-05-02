import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Label } from 'reactstrap';
import { renderTextarea, renderSelect } from '../shared/renders';
import { mapOptions } from '../helpers/selectHelper';

import './question.css';

const validate = (values, props) => {

    let errors = {};
    const { question, explanation, subject, topic } = values;

    const { intl } = props;

    if (!subject)
        errors.subject = intl.formatMessage({ id: 'label.error.subject.required' });

    if (!topic)
        errors.topic = intl.formatMessage({ id: 'label.error.topic.required' });

    if (!question)
        errors.question = intl.formatMessage({ id: 'label.error.question.required' });

    if (!explanation)
        errors.explanation = intl.formatMessage({ id: 'label.error.explanation.required' });

    errors.answers = [];
    if (!values.answers || values.answers.length < 2) {
        errors.answers._error = intl.formatMessage({ id: 'label.error.answers.length' });
    }
    else {
        const answersErrors = [];
        let atLeastOneCorrectAnswer = false;
        values.answers.forEach((answer, index) => {
            const answerErrors = {}
            if (!answer || answer.answerText === "") {
                answerErrors.answerText = intl.formatMessage({ id: 'label.error.answer.required' });
                answersErrors[index] = answerErrors
            }
            if (answer.isCorrect)
                atLeastOneCorrectAnswer = true;
        })
        errors.answers = answersErrors;

        if (!atLeastOneCorrectAnswer)
            errors.answers._error = intl.formatMessage({ id: 'label.error.answers.correct' })
    }
    return errors;
}

function onChangeTextarea(event) {
    var textArea = event.target.value;
    var index = event.target.id;
    var checkBox = document.getElementsByClassName("checkboxDiv")[index].getElementsByTagName("input")[0].checked;

    if (textArea.length > 0 && checkBox) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #04a347";
    } else if (textArea.length > 0 && !checkBox) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #ea4c4c";
    } else {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "grey";
    }
}

function onChangeCheckbox(event) {
    var checkBox = event.target.checked;
    var index = event.target.id;
    var textArea = document.getElementsByClassName("textareaDiv")[index].getElementsByTagName("textarea")[0].value;

    if (checkBox && textArea.length > 0) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #04a347";
    } else if (!checkBox && textArea.length > 0) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #ea4c4c";
    } else {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "grey";
    }
}

const renderAnswers = (intl, { fields, meta: { error, submitFailed } }) => (
    <ul className="ulContainer">
        {fields.map((answer, index) => (
            <li className="liAnswerAndCheckbox" key={index}>
                <label className="liLabel">
                    {intl.formatMessage({ id: 'label.form.answer' })}{index + 1}
                </label>
                <div className="answerAndCheckboxDiv">
                    <div className="textareaDiv">
                        <Field
                            name={`${answer}.answerText`}
                            component={renderTextarea}
                            id={index}
                            onChange={onChangeTextarea} />
                    </div>
                    <div className="checkboxDiv">
                        <Field
                            name={`${answer}.isCorrect`}
                            type="checkbox"
                            component="input"
                            onChange={onChangeCheckbox}
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
                'answerText': "",
                isCorrect: false
            })}>
                {intl.formatMessage({ id: 'label.button.addAnswer' })}
            </button>
        </li>
        {submitFailed && error && <div>{error}</div>}
    </ul>
)

class NewQuestionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: "",
            explanation: ""
        };
    }

    render() {
        const { handleSubmit, handleSubjectOnChange, handleTopicOnChange, subjects, topics, topicDisabled, intl } = this.props;
        const { question, explanation } = this.state;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="newQuestionDiv">
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
                        <div className="topicDiv">
                            <Label>
                                {intl.formatMessage({ id: 'label.message.topic' })}
                            </Label>
                            <Field
                                name="topic"
                                placeholder={intl.formatMessage({ id: 'placeholder.form.topic' })}
                                component={renderSelect}
                                onChange={handleTopicOnChange}
                                options={mapOptions(topics)}
                                isDisabled={topicDisabled}
                            />
                        </div>
                        <div className="questionDiv">
                            <Label>
                                {intl.formatMessage({ id: 'label.message.question' })}
                            </Label>
                            <Field
                                name="question"
                                placeholder={intl.formatMessage({ id: 'placeholder.form.question' })}
                                component={renderTextarea}
                                value={question}
                            />
                        </div>
                        <div className="answerDiv">
                            <FieldArray
                                name="answers"
                                component={renderAnswers.bind(this, intl)}
                            />
                        </div>
                        <div className="explanationDiv">
                            <Label>
                                {intl.formatMessage({ id: 'label.message.explanation' })}
                            </Label>
                            <Field
                                name="explanation"
                                placeholder={intl.formatMessage({ id: 'placeholder.form.explanation' })}
                                component={renderTextarea}
                                value={explanation}
                            />
                        </div>
                        <div className='submitButtonDiv'>
                            <Button type="submit" className="submitButton">
                                {intl.formatMessage({ id: 'label.button.submit' })}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'newQuestionForm',
    validate
})(NewQuestionForm)
