import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Label } from 'reactstrap';
import { renderTextarea, renderSelect } from '../shared/renders';
import { mapOptions } from '../helpers/selectHelper';
import { UPDATE_QUESTION, VALIDATE_QUESTION } from '../constants/question';

const validate = (values) => {

    let errors = {};
    const { question, explanation, subject, topic } = values;

    if (!subject)
        errors.subject = "Please select a subject!";

    if (!topic)
        errors.topic = "Please select a topic!";

    if (!question)
        errors.question = "Question must not be empty!";

    if (!explanation)
        errors.explanation = "Explanation must not be empty!";

    // if (!message)
    //     errors.message = "Explanation must not be empty!";

    errors.answers = [];
    if (!values.answers || values.answers.length < 2) {
        errors.answers._error = 'At least two answers must be entered';
    }
    else {
        const answersErrors = [];
        let atLeastOneCorrectAnswer = false;
        values.answers.forEach((answer, index) => {
            const answerErrors = {}
            if (!answer || answer.answerText === "") {
                answerErrors.answerText = "Answer text must not be empty!";
                answersErrors[index] = answerErrors
            }
            if (answer.isCorrect)
                atLeastOneCorrectAnswer = true;
        })
        errors.answers = answersErrors;

        if (!atLeastOneCorrectAnswer)
            errors.answers._error = 'At least one answer must be correct!';
    }
    return errors;
}

const renderAnswers = ({ fields, meta: { error, submitFailed } }) => (
    <ul className="ulContainer">
        {fields.map((answer, index) => (
            <li className="liAnswerAndCheckbox" key={index}>
                <h4>Answer #{index + 1}</h4>
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
                        />
                    </div>
                </div>
                <button
                    type="button"
                    title="Remove"
                    onClick={() => fields.remove(index)}
                >Remove</button>
            </li>
        ))}
        <li className="liButton">
            <button type="button" onClick={() => fields.push({
                'answerText': "",
                isCorrect: false
            })}>
                Add Answer
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
        const { handleSubmit, handleSubjectOnChange, subjects, topics } = this.props;

        const { message } = this.state;

        return (
            <form>
                {<Field
                    name="subject"
                    placeholder={"Subject"}
                    component={renderSelect}
                    onChange={handleSubjectOnChange}
                    options={mapOptions(subjects)}
                />}
                {<Field
                    name="topic"
                    placeholder={"Topic"}
                    component={renderSelect}
                    options={mapOptions(topics)}
                />}
                <Label>
                    Question
                </Label>
                {<Field
                    name="questionText"
                    component={renderTextarea}
                />}
                {<FieldArray
                    name="answers"
                    component={renderAnswers}
                />}
                <Label>
                    Explanation
                </Label>
                {<Field
                    name="explanation"
                    component={renderTextarea}
                />}
                <Label>
                    Message
                </Label>
                <Field
                    name="message"
                    component={renderTextarea}
                    value={message}
                />
                <Button type="submit" onClick={
                    handleSubmit(values =>
                        this.props.onSubmit({
                            ...values,
                            submitType: VALIDATE_QUESTION
                        }))
                }>Validate</Button>
                <Button type="submit" onClick={
                    handleSubmit(values =>
                        this.props.onSubmit({
                            ...values,
                            submitType: UPDATE_QUESTION
                        }))
                }>RequestChanges</Button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newQuestionForm',
    validate
})(UpdateQuestionForm)
