import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';

export default class QuestionListing extends Component {

    constructor(props) {
        super(props);
    }

    renderQuestions() {

        const { questions } = this.props;

        const toQuestionPath = pathToRegexp.compile(routePaths.updateQuestion);

        return questions && questions.map((question, index) => {

            console.log(question);

            return (
                <tr key={index}>
                    <td>
                        {/* <Link to={routePaths.updateQuestion}
                            params={{
                                id: question.id,
                                text: question.questionText,
                                answers: question.answerDtos,
                                explanation: question.explanation
                            }}> */}
                        {{ pathname: '/foo', query: { the: 'query' } }}
                        <Link
                            to={{
                                pathname: apiPaths.updateQuestions,
                                params: {
                                    id: question.id,
                                    text: question.questionText,
                                    answers: question.answerDtos,
                                    explanation: question.explanation
                                }
                            }}>
                            {question.questionText}
                        </Link>
                    </td>
                </tr >);
        })
    }

    render() {
        return (
            <tbody>
                {this.renderQuestions()}
            </tbody>
        );
    }
}
