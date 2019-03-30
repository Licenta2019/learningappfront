import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Label } from 'reactstrap';
import { renderTextarea, renderSelect } from '../shared/renders';
import axiosClient from '../../axios/axiosClient';
import { mapOptions } from '../helpers/selectHelper';

const validate = (values, props) => {

    console.log(props);
    let errors = {};
    const { question, answers, explanation, subject, topic } = values;

    if (!subject)
        errors.subject = "Please select a subject!";

    if (!topic)
        errors.topic = "Please select a topic!";

    if (!question)
        errors.question = "Question must not be empty!";

    if (!explanation)
        errors.explanation = "Explanation must not be empty!";

    if (!answers || answers === undefined)
        errors.answers = "You must append at least two answers";
    else
        answers.forEach((answer) => {
            if (!answer.text)
                errors.answer = "Answer must not be empty!";
        })

    return errors;
}

const renderAnswers = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
        {fields.map((answer, index) => (
            <li key={index}>
                <h4>Answer #{index + 1}</h4>
                <Field
                    name={`${answer}.answerText`}
                    component={renderTextarea}
                />
                <Field
                    name={`${answer}.isCorrect`}
                    type="checkbox"
                    component="input"
                />
                <button
                    type="button"
                    title="Remove"
                    onClick={() => fields.remove(index)}
                >Remove</button>
            </li>
        ))}
        <li>
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
            question: "",
            message: "" //notification message
        };
    }

    render() {
        const { handleSubmit, handleSubjectOnChange, handleTopicOnChange, question } = this.props;
        
        const {message } = this.state;

        return (
            <form onSubmit={handleSubmit}>
                {/* <Field
                    name="subject"
                    placeholder={"Subject"}
                    component={renderSelect}
                    onChange={handleSubjectOnChange}
                    options={mapOptions(subjects)}
                    selected={subject}
                />
                <Field
                    name="topic"
                    placeholder={"Topic"}
                    component={renderSelect}
                    onChange={handleTopicOnChange}
                    options={mapOptions(topics)}
                    selected={topic}
                />
                <Label>
                    Question
                </Label>
                <Field
                    name="question"
                    component={renderTextarea}
                    value={question}
                />
                <FieldArray
                    name="answers"
                    component={renderAnswers}
                />
                <Label>
                    Explanation
                </Label>
                <Field
                    name="explanation"
                    component={renderTextarea}
                    value={explanation}
                />
                <Field
                    name="message"
                    component={renderTextarea}
                    value={message}
                />
                <Button type="submit">Submit</Button> */}
            </form>
        );
    }
}

export default reduxForm({
    form: 'newQuestionForm',
    validate
})(UpdateQuestionForm)
