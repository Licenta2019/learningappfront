import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Label } from 'reactstrap';
import { renderTextarea, renderSelect } from '../shared/renders';
import { mapOptions } from '../helpers/selectHelper';
import { BurgerMenu } from '../shared/BurgerMenu';

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
        errors.answers._error = 'At least two answers must be added!';
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

function onChangeTextarea(event) {
    var textArea = event.target.value;
    var index = event.target.id;
    var checkBox = document.getElementsByClassName("checkboxDiv")[index].getElementsByTagName("input")[0].checked;

    if (textArea.length > 0 && checkBox) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #04a347";
    } else if(textArea.length > 0 && !checkBox) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #ea4c4c";
    } else {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "grey";
    }
}

function onChangeCheckbox (event) {
    var checkBox = event.target.checked;
    var index = event.target.id;
    var textArea = document.getElementsByClassName("textareaDiv")[index].getElementsByTagName("textarea")[0].value;

    if (checkBox && textArea.length > 0) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #04a347";
    } else if(!checkBox && textArea.length > 0) {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "1px solid #ea4c4c";
    } else {
        document.getElementsByClassName("textareaDiv")[index].style["border"] = "grey";
    }
}

const renderAnswers = ({ fields, meta: { error, submitFailed } }) => (
    <ul className="ulContainer">
        {fields.map((answer, index) => (
            <li className="liAnswerAndCheckbox" key={index}>
                <label className="liLabel">Answer #{index + 1}</label>
                <div className="answerAndCheckboxDiv">
                    <div className="textareaDiv">
                    <Field
                        name={`${answer}.answerText`}
                        component={renderTextarea}
                    id={index}
                        onChange={onChangeTextarea}/>
                    </div>
                    <div className="checkboxDiv">
                    <Field
                        name={`${answer}.isCorrect`}
                        type="checkbox"
                        component="input"
                    onChange={onChangeCheckbox}
                        id={index}/>
                    </div>
                </div>
                <button
                    className="removeButton"
                    type="button"
                    title="Remove"
                    onClick={() => fields.remove(index)}
                >Remove</button>
            </li>
        ))}
        <li className="liButton">
            <button className="addButton" type="button" onClick={() => fields.push({
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
        const { question, explanation } = this.state;

        const customStyles = {
            control: (base, state) => ({
              ...base,
              background: "#3b4148",
              color: "#606468",
              font: "14px",

              borderColor: null,

              "&:hover": {

                borderColor: "grey"
              }
            }),
            menuList: base => ({
              ...base,
              background: "#3b4148",
              color: "#606468",
              border: "1px solidgrey"
            }),
            input: base => ({
                ...base,
                background: "#3b4148",  color: "#606468",
              font: "14px"
            }),
            dropdownIndicator: base => ({
                ...base,
                background: "#2e3338"
           }), option: (styles, state) => ({
              ...styles,
                color: state.isSelected ? "#FFF" : "#606468",
                backgroundColor: state.isSelected ? "#3297FD" : styles.color,
                borderBottom: "1px solid rgba( 0, 0, 0, 0.125)",
                "&:hover": {
                  color: "#FFF",
                  backgroundColor: "#3297FD"
                }
              }),
            singleValue: (styles, state) => ({
                ...styles,
                color: "#606468"
            })
        };

        return (
            <div>
            <BurgerMenu/>
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

                    <div className='submitButtonDiv'>
                        <Button type="submit" className="submitButton">Submit</Button>
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
