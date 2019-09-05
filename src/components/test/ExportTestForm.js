import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import '../question/question.css';
import TextareaAutosize from 'react-autosize-textarea/lib';

class ExportTestForm extends Component {

    renderAnswers(answers) {

        return answers.map((answer, key) => {
            return (
                <div key={key} >
                    <div className="answerAndCheckboxDiv">
                        <div className="textareaDiv">
                            <Label>{answer.answerText}</Label>
                            <div className={`checkboxDiv ${(answer.isCorrect ? 'green-border' : 'red-border')}`}>
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

    renderQuestions(questions, intl) {
        return questions.map((question, key) => {

            return (
                <div key={key}
                    style={{ border: '1px solid black', padding: '10px' }}
                >
                    <TextareaAutosize className="textareaDiv"
                        value={`${key + 1}.\n${question.questionText}`} />
                    {this.renderAnswers(question.answerDtos)}
                    {
                        <Label className="textareaDiv">{intl.formatMessage({ id: "label.message.explanation" })} :
                            {question.explanation}</Label>
                    }

                </div>
            );
        });
    }

    render() {
        const { testData, handleSubmit, intl, questions,onChangeFile } = this.props;

        return (
            testData && <div className="subjectDiv">
                <form onSubmit={handleSubmit}>
                    <Label>{intl.formatMessage({ id: "label.table.testName" })} : {testData.name}</Label>
                    <Label>{intl.formatMessage({ id: "label.form.difficulty" })} : {testData.difficulty}</Label>
                    <Label>{intl.formatMessage({ id: "label.form.creationDate" })} : {testData.creationDate}</Label>
                    <div>
                        {this.renderQuestions(questions, intl)}
                    </div>

                    <input name="filePath" onChange={onChangeFile} directory="" webkitdirectory="" type="file"/>
                                        
                    <Button type="Submit" className="submitButton">
                        {intl.formatMessage({ id: "label.button.export" })}
                    </Button>

                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'exportTestForm',
})(ExportTestForm)
