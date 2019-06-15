import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import { throwSubmissionError } from '../helpers/errors';
import routePaths from './../../routes/routePaths';
import { injectIntl } from 'react-intl';
import { getUser } from '../../localStorage';
import { withRouter } from "react-router";
import NewTestForm from './NewTestForm';
 
class NewTestContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicId: null, //todo set this from props
            subjects: [],
            topics: [],
            topicDisabled: true
        };

        this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
        this.handleTopicOnChange = this.handleTopicOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        console.log(value);
        const { subjects } = this.state;

        const subject = subjects.filter(subject => subject.id === value.value)[0];

        this.setState({
            topics: subject.topicDtos,
            topicDisabled: false
        });
    }

    handleTopicOnChange(value) {
        this.setState({
            topic: value.value
        })
    }

    handleSubmit(value) {
        // console.log(value);
        const { testName, topics } = value;

        let topicsDto = topics.map(topic => { return { topicId: topic.topic.value, questionsNumber: topic.questionsNumber } });

        axiosClient.post(apiPaths.addTest, {
            name: testName,
            topicTestDtoList: topicsDto,
        }).then(() => {
            this.props.history.push(routePaths.homepage);
        })
            .catch((err) => console.log(err.data)); //TODO catch error here
    }

    render() {
        const { subjects, topics, topicDisabled } = this.state;

        const { intl } = this.props;

        console.log(this.state);
        return (
            <div>
                <NewTestForm
                    onSubmit={this.handleSubmit}
                    intl={intl}
                    subjects={subjects}
                    topics={topics}
                    handleTopicOnChange={this.handleTopicOnChange}
                    handleSubjectOnChange={this.handleSubjectOnChange}
                    topicDisabled={topicDisabled}
                />
            </div>
        );
    }
}

export default injectIntl(withRouter(NewTestContainer));
