import React, { Component } from 'react';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import QuestionListing from './QuestionListing';
import QuestionFilter from './QuestionFilter';
import { Container } from 'reactstrap';

export default class QuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            topics: [],
            topicsDisabled:true,
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

    getQuestions(topicId) {

        return axiosClient.get(apiPaths.getQuestions.replace('{}',topicId));
    }

    componentDidMount() {
        this.getSubjects()
            .then((subjects) => {
                this.setState({
                    subjects: subjects.data
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

    handleTopicOnChange(value){
        const topic = this.state.topics.filter(topic => topic.id === value.value)[0];

        this.getQuestions(topic.id)
        .then((questions) => {
            console.log("then");
            this.setState({
                questions: questions.data
            })
        })
    }

    render() {
        
        const { questions, subjects,topics,topicsDisabled } = this.state;
        return (
            <Container>
                <QuestionFilter
                    subjects={subjects}
                    topics = {topics}
                    handleSubjectOnChange={this.handleSubjectOnChange}
                    handleTopicOnChange={this.handleTopicOnChange}
                    topicsDisabled = {topicsDisabled}
                />
                <QuestionListing
                    questions={questions}
                />
            </Container>
        );
    }
}