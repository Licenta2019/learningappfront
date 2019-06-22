import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import routePaths from './../../routes/routePaths';
import { injectIntl } from 'react-intl';
import { withRouter } from "react-router";
import NewTestForm from './NewTestForm';

class NewTestContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            topics: [],
            difficulties: [],
            topicDisabled: true
        };
        this.getSubjects = this.getSubjects.bind(this);
        this.getDifficulties = this.getDifficulties.bind(this);

        this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getSubjects() {
        return axiosClient.get(apiPaths.getSubjects);
    }

    getDifficulties() {
        return axiosClient.get(apiPaths.getTestDifficulties);
    }

    componentDidMount() {
        Promise.all([this.getSubjects(), this.getDifficulties()])
            .then(([subjects, difficulties]) => {

                console.log(difficulties);
                this.setState({
                    subjects: subjects.data,
                    difficulties: difficulties.data
                })
            })
    }

    handleSubjectOnChange(value) {
        const { subjects } = this.state;

        const subject = subjects.filter(subject => subject.id === value.value)[0];

        this.setState({
            topics: subject.topicDtos,
            topicDisabled: false
        });
    }

    handleSubmit(value) {
        console.log(value);

        const { testName, topics } = value;

        let topicsDto = topics.map(topic => {
            return {
                topicId: topic.topic.value,
                questionsNumber: topic.questionsNumber,
                difficulty: topic.difficulty.value
            }
        });

        axiosClient.post(apiPaths.addTest, {
            name: testName,
            topicTestDtoList: topicsDto
        }).then(() => {
            this.props.history.push(routePaths.homepage);
        })
            .catch((err) => console.log(err.data)); //TODO catch error here
    }

    render() {
        const { subjects, topics, topicDisabled, difficulties } = this.state;

        const { intl } = this.props;

        console.log(this.state);
        return (
            <div>
                <NewTestForm
                    onSubmit={this.handleSubmit}
                    intl={intl}
                    subjects={subjects}
                    topics={topics}
                    handleSubjectOnChange={this.handleSubjectOnChange}
                    topicDisabled={topicDisabled}
                    difficulties={difficulties}
                />
            </div>
        );
    }
}

export default injectIntl(withRouter(NewTestContainer));
