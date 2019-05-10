import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import QuestionListing from './QuestionListing';
import QuestionFilter from './QuestionFilter';
import { Container } from 'reactstrap';
import { getUser } from '../../localStorage';
import { injectIntl } from 'react-intl';

import './question.css';

class QuestionContainer extends Component {

    constructor(props) {

        super(props);

        console.log(this.props.location);

        this.state = {
            subjects: [],
            topics: [],
            topicsDisabled: true,
            questions: []
        }

        this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
        this.handleTopicOnChange = this.handleTopicOnChange.bind(this);

        this.getSubjects = this.getSubjects.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
    }

    getSubjects() {
        return axiosClient.get(apiPaths.getSubjects);
    }

    getQuestions() {
        const user = getUser();

        console.log(user);
        
        const path = user.userRole === 'STUDENT' ? apiPaths.getStudentQuestions : apiPaths.getProfessorQuestions;
        return axiosClient.get(path.replace('{}', user.id));
    }

    componentDidMount() {
        Promise.all([this.getSubjects(), this.getQuestions()])
            .then(([subjects, questions]) => {
                this.setState({
                    subjects: subjects.data,
                    questions: questions.data
                })
            })
    }

    handleSubjectOnChange(value) {
        const subject = this.state.subjects.filter(subject => subject.id === value.value)[0];

        this.setState({
            topics: subject.topicDtos,
            topicDisabled: false
        });
    }

    handleTopicOnChange(value) {
        const topic = this.state.topics.filter(topic => topic.id === value.value)[0];

        this.getQuestions(topic.id)
            .then((questions) => {
                this.setState({
                    questions: questions.data
                })
            })
    }

    render() {

        const { questions, subjects, topics, topicsDisabled } = this.state;
        return (
            <Container>
                <QuestionFilter
                    subjects={subjects}
                    topics={topics}
                    handleSubjectOnChange={this.handleSubjectOnChange}
                    handleTopicOnChange={this.handleTopicOnChange}
                    topicsDisabled={topicsDisabled}
                    intl={this.props.intl}
                />
                <QuestionListing
                    questions={questions}
                    intl={this.props.intl}
                />
            </Container>
        );
    }
}

export default injectIntl(QuestionContainer);