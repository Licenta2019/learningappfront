import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import '../question/question.css';
import TextareaAutosize from 'react-autosize-textarea/lib';

class TakeTestForm extends Component {

    renderAnswers(answers, grade) {

        return answers.map((answer, key) => {
            return (
                <div key={key} >
                    <div className="answerAndCheckboxDiv">
                        <div className="textareaDiv">
                            <Label>{answer.answerText}</Label>
                            <div className={`checkboxDiv ${grade !== null ? (answer.isCorrect ? 'green-border' : 'red-border') : ''}`}>
                                <Field
                                    name={`${answer.id}`}
                                    type="checkbox"
                                    component="input"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    renderQuestions(questions, grade, intl) {
        return questions.map((question, key) => {

            return (
                <div key={key}
                    style={{ border: '1px solid black', padding: '10px' }}
                >
                    <TextareaAutosize className="textareaDiv"
                        value={`${key + 1}.\n${question.questionText}`} />
                    {this.renderAnswers(question.answerDtos, grade)}
                    {
                        grade !== null && <Label className="textareaDiv">{intl.formatMessage({ id: "label.message.explanation" })} :
                            {question.explanation}</Label>
                    }

                </div>
            );
        });
    }

    render() {
        const { testData, handleSubmit, intl, questions, grade } = this.props;

        return (
            testData && <div className="subjectDiv">
                <form onSubmit={handleSubmit}>
                    <Label>{intl.formatMessage({ id: "label.table.testName" })} : {testData.name}</Label>
                    <Label>{intl.formatMessage({ id: "label.form.difficulty" })} : {testData.difficulty}</Label>
                    <Label>{intl.formatMessage({ id: "label.form.creationDate" })} : {testData.creationDate}</Label>
                    <div>
                        {this.renderQuestions(questions, grade, intl)}
                    </div>

                    {grade !== null && <Label>{intl.formatMessage({ id: "label.form.grade" })}{grade}  </Label>}

                    {grade === null && <Button type="Submit" disabled={grade !== null} className="submitButton">
                        {intl.formatMessage({ id: "label.button.submit" })}
                    </Button>}

                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'takeTestForm',
})(TakeTestForm)
