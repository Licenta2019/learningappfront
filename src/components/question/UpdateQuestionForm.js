import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Label } from 'reactstrap';
import { renderTextarea, renderSelect, renderSlider } from '../shared/renders';
import { mapOptions } from '../helpers/selectHelper';
import { UPDATE_QUESTION, VALIDATE_QUESTION } from '../constants/question';

import './question.css';

const validate = (values, props) => {
    const { intl } = props;

    let errors = {};
    const { question, explanation, subject, topic, difficulty } = values;

    if (!subject)
        errors.subject = intl.formatMessage({ id: 'label.error.subject.required' });

    if (!topic)
        errors.topic = intl.formatMessage({ id: 'label.error.topic.required' });

    if (!question)
        errors.question = intl.formatMessage({ id: 'label.error.question.required' });

    if (!explanation)
        errors.explanation = intl.formatMessage({ id: 'label.error.explanation.required' });

    if (!difficulty || difficulty < 1 || difficulty > 10)
        errors.difficulty = intl.formatMessage({ id: 'label.error.difficulty.required' });;

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
                    {intl.formatMessage({ id: 'label.form.answer' })}
                    {index + 1}</label>
                <div className="answerAndCheckboxDiv">
                    <div className="textareaDiv">
                        <Field
                            name={`${answer}.answerText`}
                            component={renderTextarea}
                        />
                    </div>
                    <div className="checkboxDiv">
                        <Field
                            name={`${answer}.isCorrect`}
                            type="checkbox"
                            component="input"
                            onChange={onChangeCheckbox}
                            id={index}
                        />
                    </div>
                </div>
                <button
                    className="removeButton"
                    type="button"
                    title="Remove"
                    onClick={() => fields.remove(index)}
                >{intl.formatMessage({ id: 'label.button.remove' })}
                </button>
            </li>
        ))}
        <li className="liButton">
            <button className="addButton" type="button" onClick={() => fields.push({
                'answerText': "",
                isCorrect: false
            })}>
                {intl.formatMessage({ id: 'label.button.addAnswer' })}
            </button>
            {submitFailed && error && <span>{error}</span>}
        </li>
    </ul>
)

class UpdateQuestionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "" //notification message
        };
    }

    render() {
        const { handleSubmit, handleSubjectOnChange, subjects, topics, error, intl } = this.props;
        const { message } = this.state;

        return (
            <div>
                <form>
                    <div className="updateQuestionDiv">
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
                                options={mapOptions(topics)}
                            />
                        </div>
                        <div className="questionDiv">
                            <Label>
                                {intl.formatMessage({ id: 'label.message.question' })}
                            </Label>
                            <Field
                                name="questionText"
                                component={renderTextarea}
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
                                placeholder={intl.formatMessage({ id: 'placeholder.form.explanation' })}
                                name="explanation"
                                component={renderTextarea}
                            />
                        </div>
                        <div className="difficultyDiv">
                            <Label>
                                {intl.formatMessage({ id: 'label.form.difficulty' })}
                            </Label>
                            <Field
                                name="difficulty"
                                component={renderSlider}
                                orientation="horizontal"
                                min={0}
                                max={10}
                            />
                        </div>
                        <div className="messageDiv">
                            <Label>
                                {intl.formatMessage({ id: 'label.form.message' })}
                            </Label>
                            <Field
                                name="message"
                                component={renderTextarea}
                                value={message}
                            />
                        </div>

                        {error !== undefined && <div className="text-danger">{error}</div>}

                        <div className='submitButtonDiv'>
                            <Button className="submitButton" type="submit" onClick={
                                handleSubmit(values =>
                                    this.props.onSubmit({
                                        ...values,
                                        submitType: VALIDATE_QUESTION
                                    }))
                            }>
                                {intl.formatMessage({ id: 'label.button.validate' })}
                            </Button>
                        </div>
                        <div className='requestChangesButtonDiv'>
                            <Button className="requestChangesButton" type="submit" onClick={
                                handleSubmit(values =>
                                    this.props.onSubmit({
                                        ...values,
                                        submitType: UPDATE_QUESTION
                                    }))
                            }>
                                {intl.formatMessage({ id: 'label.button.requestChanges' })}
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
})(UpdateQuestionForm)
