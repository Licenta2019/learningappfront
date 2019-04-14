import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Label } from 'reactstrap';
import { renderTextarea, renderSelect } from '../shared/renders';
import { mapOptions } from '../helpers/selectHelper';

import './newQuestion.css';

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

class NewQuestionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: "",
            explanation: ""
        };
    }

    render() {
        const { handleSubmit, handleSubjectOnChange, handleTopicOnChange, subjects, topics, topicDisabled } = this.props;
        const { question, explanation, answers } = this.state;

        const customStyles = {
            control: (base, state) => ({
                ...base,
                background: "#3b4148",
                color: "#606468",
                font: "14px",
                // match with the menu
                //borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
                // Overwrittes the different states of border
                //borderColor: state.isFocused ? "yellow" : "green",
                borderColor: null,
                // Removes weird border around container
                //boxShadow: state.isFocused ? null : null,
                "&:hover": {
                    // Overwrittes the different states of border
                    borderColor: "grey"
                }
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                //borderRadius: 0,
                // kill the gap
                //marginTop: 0
            }),
            menuList: base => ({
                ...base,
                background: "grey",
                color: "#606468"
                // kill the white space on first and last option
                //padding: 0
            })
        };

        return (
            <form onSubmit={handleSubmit}>
                <div className="newQuestionDiv">
                    <div className="subjectDiv">
                        <Label>Choose a subject:</Label>
                        <Field
                            name="subject"
                            placeholder={"Subject"}
                            component={renderSelect}
                            onChange={handleSubjectOnChange}
                            options={mapOptions(subjects)}
                            styles={customStyles}
                        />
                    </div>
                    <div className="topicDiv">
                        <Label>Choose a topic:</Label>
                        <Field
                            name="topic"
                            placeholder={"Topic"}
                            component={renderSelect}
                            onChange={handleTopicOnChange}
                            options={mapOptions(topics)}
                            isDisabled={topicDisabled}
                            styles={customStyles}
                        />
                    </div>
                    <div className="questionDiv">
                        <Label>
                            Question:
                        </Label>
                        <Field
                            name="question"
                            placeholder={"Write a question"}
                            component={renderTextarea}
                            value={question}
                        />
                    </div>
                    <div className="answerDiv">
                        <FieldArray
                            name="answers"
                            component={renderAnswers}
                        />
                    </div>
                    <div className="explanationDiv">
                        <Label>
                            Explanation:
                        </Label>
                        <Field
                            name="explanation"
                            placeholder={"Write an explanation"}
                            component={renderTextarea}
                            value={explanation}
                        />
                    </div>

                    <div className='buttonSubmitDiv'>
                        <Button type="submit" className="submitButton">Submit</Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newQuestionForm',
    initialValues: {
        answers: [{
            'answerText': "",
            isCorrect: false
        },
        {
            'answerText': "",
            isCorrect: false
        }]
    },
    validate
})(NewQuestionForm)
