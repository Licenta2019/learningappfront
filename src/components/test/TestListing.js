import React, { Component } from 'react';
import routePaths from '../../routes/routePaths';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import '../question/questionsListing.css';
import '../question/question.css';
import '../question/table.css';
import { renderTableHeader } from '../shared/renders';
export default class TestListing extends Component {

    renderTests() {

        const { tests } = this.props;

        return tests && tests.map((test, index) => {

            const toTestPath = pathToRegexp.compile(routePaths.getTest);

            return (
                {
                    testName: <Link to={toTestPath({
                        test_id: test.id
                    })}>
                        {test.name}
                        <span className="tooltip">
                            {tests.name}</span>
                    </Link>,
                    author: test.author,
                    updateDate: test.creationDate
                }
            );
        });
    }

    render() {

        const { intl } = this.props;

        const columns = renderTableHeader([
            'testName',
            'author',
            'updateDate'],
            intl);

        return (
            <div className="questionListingDiv">
                <div className="tableDiv">
                    <ReactTable
                        className="-striped -highlight"
                        data={this.renderTests()}
                        columns={columns}
                        defaultPageSize={10}
                    />
                </div>
            </div>
        );
    }
}
