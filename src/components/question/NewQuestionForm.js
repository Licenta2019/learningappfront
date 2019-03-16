import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button } from 'reactstrap';
import AnswerRow, { answerRow } from './AnswerRow';
import { renderTextarea } from '../shared/renders';

const validate = (values) => {
    console.log(values);
}

const renderAnswers = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
        {fields.map((answer, index) => (
            <li key={index}>
                <h4>Answer #{index + 1}</h4>
                <Field
                    name={`${answer}.answerText`}
                    type="text"
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

class NewQuestionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: "",
            answers: []
        };

        this.handleQuestionOnChange = this.handleQuestionOnChange.bind(this);
    }

    handleQuestionOnChange(event) {
        this.setState({
            question: event.target.value
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const { question, answers, isValid } = this.state;

        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="question"
                    component="textarea"
                    value={question}
                    onChange={this.handleQuestionOnChange}
                />
                <FieldArray
                    name="answers"
                    component={renderAnswers}
                />
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newQuestionForm',
    vaidate: validate
})(NewQuestionForm)