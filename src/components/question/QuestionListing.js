import React, { Component } from 'react';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';

export default class QuestionListing extends Component {

    renderQuestions() {

        const { questions } = this.props;

        return questions && questions.map((question, index) => {

            const toQuestionPath = pathToRegexp.compile(routePaths.updateQuestion);

            return (
                <tr key={index}>
                    <td>
                        <Link to={toQuestionPath({
                            question_id: question.id,
                            text: question.questionText,
                            answers: question.answerDtos,
                            explanation: question.explanation
                        })}
                        >
                            {/* <Link
                            to={{
                                pathname: apiPaths.updateQuestions,
                                params: {
                                    id: question.id,
                                    text: question.questionText,
                                    answers: question.answerDtos,
                                    explanation: question.explanation
                                }
                            }}> */}
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
