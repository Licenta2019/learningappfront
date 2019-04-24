import React, { Component } from 'react';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import './questionsListing.css';

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
                            {question.questionText}
                        </Link>
                    </td>
                    <td>{question.topic}</td>
                    <td>{question.subject}</td>
                    <td>{question.author}</td>
                    <td>{question.creationDate}</td>
                </tr >);
        })
    }

    render() {
        return (
            <div class = "table-container">
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>
                                QuestionText
                        </th>
                            <th>
                                Topic
                        </th>
                            <th>
                                Subject
                        </th>
                            <th>
                                Author
                        </th>
                            <th>
                                UpdateData
                        </th>
                        </tr>
                    </thead>
                    {this.renderQuestions()}
                </Table>
            </div>
        );
    }
}
