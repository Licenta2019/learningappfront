import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';

import TakeTestForm from './TakeTestForm';
import { injectIntl } from 'react-intl';
import routePaths from './../../routes/routePaths';
class TakeTestContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            testData: null,
            questions: [],
            grade: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axiosClient.get(apiPaths.getTest.replace("{}", this.props.match.params.test_id))
            .then((response) => {
                this.setState({
                    testData: response.data.baseTestDto,
                    questions: response.data.testQuestionDtoList
                })
            });
    }

    getQuestion(questions, answerId) {
        return questions.filter(question => question.answerDtos.filter(answer => answer.id === answerId)[0])[0].id;
    }

    handleSubmit(values) {

        const { questions, testData } = this.state;

        const correctAnswers = {
            testId: testData.id,
            questions: questions.map(question => { return { questionId: question.id, answers: [] } })

        };
        Object.keys(values).forEach(answer => {
            if (values[answer]) {
                const qid = this.getQuestion(this.state.questions, answer);
                correctAnswers.questions.filter(canswer => canswer.questionId === qid)[0].answers.push(answer);
            }
        });

        axiosClient.post(apiPaths.gradeTest, correctAnswers)
            .then((response) => {
                this.setState({
                    grade: response.data
                })
            })
            .catch((exc) => console.log(exc));
    }

    render() {
        const { testData, questions, grade } = this.state;

        return (
            questions && testData && <TakeTestForm
                testData={testData}
                questions={questions}
                onSubmit={this.handleSubmit}
                intl={this.props.intl}
                grade={grade}
            />
        );
    }
}

export default injectIntl(TakeTestContainer);
