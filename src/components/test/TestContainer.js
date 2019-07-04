import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import { injectIntl } from 'react-intl';
import { withRouter } from "react-router";
import TestListing from '../test/TestListing';
import { Label } from 'reactstrap';
import { mapOptions } from '../helpers/selectHelper';
import Select from 'react-select';
import { customStyles } from '../shared/customSelectStyle';

class TestContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            tests: []
        };

        this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
        this.getTests = this.getTests.bind(this);
    }

    componentDidMount() {
        axiosClient.get(apiPaths.getSubjects)
            .then((subjects) => {
                this.setState({
                    subjects: subjects.data
                })
            });
    }

    handleSubjectOnChange(value) {
        const { subjects } = this.state;

        const subject = subjects.filter(subject => subject.id === value.value)[0];

        this.getTests(subject.id);
    }

    getTests(subjectId) {
        axiosClient.get(apiPaths.getTests.replace("{}", subjectId))
            .then((response) => {
                this.setState({
                    tests: response.data
                })
            })
    }

    render() {
        const { subjects, tests } = this.state;

        const { intl } = this.props;

        return (
            <div>
                <div className="subjectDiv">
                    <Label>{intl.formatMessage({ id: "label.message.subject" })}</Label>
                    <Select
                        name="subject"
                        placeholder={intl.formatMessage({ id: 'placeholder.form.subject' })}
                        onChange={this.handleSubjectOnChange}
                        options={mapOptions(subjects)}
                        styles={customStyles}
                    />
                </div>
                <TestListing
                    intl={intl}
                    tests={tests}
                />
            </div>
        );
    }
}

export default injectIntl(withRouter(TestContainer));
