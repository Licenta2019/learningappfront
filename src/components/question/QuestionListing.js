import React, { Component } from 'react';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';
import ReactTable from 'react-table';
import './questionsListing.css';
import './question.css';
import './table.css';
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
                    creationDate: question.creationDate
                }
            );
        });
    }

    render() {

        // const data = [{
        //     name: 'Tanner Linsley',
        //     age: 26,
        //     friend: {
        //       name: 'Jason Maurer',
        //       age: 23,
        //     }
        //   }
        // ];

        // const columns = [{
        //     Header: 'Name',
        //     accessor: 'name' // String-based value accessors!
        //   }, {
        //     Header: 'Age',
        //     accessor: 'age',
        //     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        //   }, {
        //     id: 'friendName', // Required because our accessor is not a string
        //     Header: 'Friend Name',
        //     accessor: d => d.friend.name // Custom value accessors!
        //   }, {
        //     Header: props => <span>Friend Age</span>, // Custom header components!
        //     accessor: 'friend.age'
        //   }]


        const columns = [{
            Header: 'Question',
            accessor: 'questionText',
        }, {
            Header: 'Topic',
            accessor: 'topic',
        }, {
            Header: 'Subject',
            accessor: 'subject',
        }, {
            Header: 'Author',
            accessor: 'author',
            resizable: false,
        }, {
            Header: 'Update Date',
            accessor: 'creationDate',
            resizable: false,
        }];

        return (
            <div className="questionListingDiv">
                <div className="tableDiv">
                    <Label>Table:</Label>
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
