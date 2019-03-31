import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Label } from 'reactstrap';
import { renderTextarea, renderSelect } from '../shared/renders';
import { mapOptions } from '../helpers/selectHelper';

const validate = (values, props) => {

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

class UpdateQuestionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "" //notification message
        };
    }

    renderAnswers = ({ meta: { error, submitFailed } }) => {
        
        const {answerDtos} = this.props.question;

        return (
        <ul>
            {answerDtos && answerDtos.map((answer, index) => (
                <li key={index}>
                    <h4>Answer #{index + 1}</h4>
                    <Field
                        name={`${answer}.answerText`}
                        component={renderTextarea}
                        value={answer.answerText}
                    />
                    <Field
                        name={`${answer}.isCorrect`}
                        type="checkbox"
                        component="input"
                        selected={answer.isCorrect}
                    />
                    <button
                        type="button"
                        title="Remove"
                        onClick={() => answerDtos.remove(index)}
                    >Remove</button>
                </li>
            ))}
            <li>
                <button type="button" onClick={() => answerDtos.push({
                    'answerText': "",
                    isCorrect: false
                })}>
                    Add Answer
                        </button>
                {submitFailed && error && <span>{error}</span>}
            </li>
        </ul>)
    }

    render() {
        const { handleSubmit, handleSubjectOnChange, question, subjects, topics } = this.props;

        console.log(question);

        const { message } = this.state;

        return (
            <form onSubmit={handleSubmit}>
                {subjects && <Field
                    name="subject"
                    placeholder={"Subject"}
                    component={renderSelect}
                    onChange={handleSubjectOnChange}
                    options={mapOptions(subjects)}
                // selected={subject}
                />}
                {topics && <Field
                    name="topic"
                    placeholder={"Topic"}
                    component={renderSelect}
                    options={mapOptions(topics)}
                // selected={topic}
                />}
                <Label>
                    Question
                </Label>
                {question && <Field
                    name="question"
                    component={renderTextarea}
                    value={question.questionText}
                />}
                {question.answerDtos && <FieldArray
                    name="answers"
                    component={this.renderAnswers}
                />}
                <Label>
                    Explanation
                </Label>
                {question.explanation && <Field
                    name="explanation"
                    component={renderTextarea}
                    value={question.explanation}
                />}
                <Label>
                    Message
                </Label>
                <Field
                    name="message"
                    component={renderTextarea}
                    value={message}
                />
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newQuestionForm',
    validate
})(UpdateQuestionForm)
