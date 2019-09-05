import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';

import TakeTestForm from './TakeTestForm';
import ExportTestForm from './ExportTestForm';
import { injectIntl } from 'react-intl';
import { getUser } from '../../localStorage';
import { isProfessor } from '../helpers/user';

class TakeTestContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            testData: null,
            questions: [],
            grade: null,
            filePath: null
        }

        this.handleSubmitTest = this.handleSubmitTest.bind(this);
        this.handleExportTest = this.handleExportTest.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    onChangeFile(event) {
        this.setState({
            filePath: event.target.files[0].webkitRelativePath
        })
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

    handleSubmitTest(values) {
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

    handleExportTest() {

        const { testData, filePath } = this.state;

        axiosClient.post(apiPaths.exportPdf, {
            testId: testData.id,
            path: filePath
        })
            .then((response) => {
            })
            .catch((exc) => console.log(exc));
    }

    render() {
        const { testData, questions, grade, filePath } = this.state;

        const userRole = getUser().userRole;

        return (
            questions && testData && isProfessor(userRole) ?
                <ExportTestForm
                    testData={testData}
                    questions={questions}
                    onSubmit={this.handleExportTest}
                    intl={this.props.intl}
                    filePath={filePath}
                    onChangeFile={this.onChangeFile}
                /> :
                <TakeTestForm
                    testData={testData}
                    questions={questions}
                    onSubmit={this.handleSubmitTest}
                    intl={this.props.intl}
                    grade={grade}
                />
        );
    }
}

export default injectIntl(TakeTestContainer);
