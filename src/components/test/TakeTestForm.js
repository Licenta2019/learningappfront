import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { renderField } from '../shared/renders';

const validate = (values, props) => {
}

const renderQuestions = ({ fields, meta: { error, submitFailed } }) => (

    <ul className="ulContainer">
        {
            fields.map((question, index) => (
                <li key={index}>
                    <Label>{question.questionText}</Label>

                    {/* <FieldArray
                        name="answers"
                        component={renderAnswers.bind(this, question.answerDtos)}
                    /> */}

                </li>
            ))
        }
        {submitFailed && error && <div>{error}</div>}
    </ul>
);

const renderAnswers = ({ fields, meta: { error, submitFailed } }) => (
    <div>
        {fields.map((answer, index) => (
            <div key={index} className="answerAndCheckboxDiv">
                <Label>cheat</Label>
                <div key={index} className="checkboxDiv">
                    <Field
                        name={`${answer}.isCorrect`}
                        type="checkbox"
                        component="input"
                        id={index} />
                </div>
            </div>
        ))}
        {submitFailed && error && <div>{error}</div>}
    </div>
)


class TakeTestForm extends Component {

    renderAnswers(answers) {
        return answers.map((answer, key) => {
            return (
                <div key={key} >
                    <Label>{answer.answerText}</Label>
                    <div className="checkboxDiv">
                        <Field
                            name={`${answer.id}`}
                            type="checkbox"
                            component="input"
                            id={key} />
                    </div>
                </div>
            );
        })
    }


    renderQuestions(questions) {
        return questions.map((question, key) => {

            return (
                <div key={key}
                    style={{ border: '1px solid black', padding: '10px' }}
                >
                    <Label className="textareaDiv">{`${key + 1}.\n${question.questionText}`}</Label>
                {this.renderAnswers(question.answerDtos)}
                </div>
            );
        });
    }

    render() {
        const { testData, handleSubmit, intl, questions } = this.props;

        return (
            testData && <div>
                <form onSubmit={handleSubmit}>
                    <Label>{testData.name}</Label>

                    <div>
                        {this.renderQuestions(questions)}
                    </div>

                    <Button type="Submit" className="submitButton">
                        {intl.formatMessage({ id: "label.button.submit" })}
                    </Button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'takeTestForm',
    validate,
})(TakeTestForm)
