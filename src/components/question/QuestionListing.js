import React, { Component } from 'react';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import './questionsListing.css';
import './question.css';
import './table.css';
import { renderTableHeader } from '../shared/renders';
export default class QuestionListing extends Component {

    renderQuestions() {

        const { questions } = this.props;

        return questions && questions.map((question, index) => {

            const toQuestionPath = pathToRegexp.compile(routePaths.updateQuestion);

            return (
                {
                    questionText: <Link to={toQuestionPath({
                        question_id: question.id,
                        text: question.questionText,
                        answers: question.answerDtos,
                        explanation: question.explanation
                    })}
                    >
                        {question.questionText}
                        <span className="tooltip">
                            {question.questionText}</span>
                    </Link>,
                    topic: question.topic,
                    subject: question.subject,
                    author: question.author,
                    updateDate: question.updateDate
                }
            );
        });
    }

    render() {

        const { intl } = this.props;

        const columns = renderTableHeader([
            'questionText',
            'topic',
            'subject',
            'author',
            'updateDate'],
            intl);

        return (
            <div className="questionListingDiv">
                <div className="tableDiv">
                    <ReactTable
                        className="-striped -highlight"
                        data={this.renderQuestions()}
                        columns={columns}
                        defaultPageSize={10}
                    />
                </div>
            </div>
        );
    }
}
