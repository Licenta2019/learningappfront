import React, { Component } from 'react';
import NewQuestionForm from './NewQuestionForm';
import { withRouter } from 'react-router-dom';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import { Row } from 'reactstrap';

const topicId = '374c6260-2bc8-4a54-acc4-12a2e082f876';
class NewQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicId: null, //todo set this from props
            subjects: [],
            topics: [],
            topicDisabled:true
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
            topicDisabled : false
        });
    }

    handleTopicOnChange(value) {
        this.setState({
            topic: value.value
        })
    }

    handleSubmit(value) {
        
        console.log(value);

        const { question, answers, explanation,topic } = value;

        axiosClient.post(apiPaths.addQuestion.replace('{}', topic.value), {
            questionText: question,
            answerDtos: answers,
            explanation: explanation
        }).then(() => {
            // TODO add modal here
        })
            .catch((err) => console.log(err)); //TODO catch error here
    }

    render() {
        const { subjects, topics, subject, topic,topicDisabled } = this.state;

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
