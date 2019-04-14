import React, { Component } from 'react';
import NewQuestionForm from './NewQuestionForm';
import { withRouter } from 'react-router-dom';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import routePaths from './../../routes/routePaths';

class NewQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicId: null, //todo set this from props
            subjects: [],
            topics: [],
            topicDisabled: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
        this.handleTopicOnChange = this.handleTopicOnChange.bind(this);
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
        const { question, answers, explanation, topic } = value;

        axiosClient.post(apiPaths.addQuestion.replace('{}', topic.value), {
            questionText: question,
            answerDtos: answers,
            explanation: explanation,
            status: 'PENDING',
            studentId: '15ba3454-65e2-439c-8519-9ba135cf97b9' //remove moock after login implementation
        }).then(() => {
            this.props.history.push(routePaths.homepage);
            // TODO add modal here
        })
            .catch((err) => console.log(err)); //TODO catch error here
    }

    render() {
        const { subjects, topics, topicDisabled } = this.state;

        return (
            <div>
                <NewQuestionForm
                    onSubmit={this.handleSubmit}
                    handleSubjectOnChange={this.handleSubjectOnChange}
                    handleTopicOnChange={this.handleTopicOnChange}
                    subjects={subjects}
                    topics={topics}
                    topicDisabled={topicDisabled}
                />
            </div>
        );
    }
}

export default withRouter(NewQuestionContainer);
