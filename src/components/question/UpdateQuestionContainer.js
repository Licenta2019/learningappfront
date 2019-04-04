import React, { Component } from 'react';
import UpdateQuestionForm from './UpdateQuestionForm';
import { withRouter } from 'react-router-dom';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';

class UpdateQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            selectedSubject: null,
            topics: [],
            selectedTopic: null,
            question: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
        // this.handleTopicOnChange = this.handleTopicOnChange.bind(this);
    }

    componentDidMount() {

        Promise.all([this.getSubjects(), this.getQuestion()])
            .then(([subjects, question]) => {
                this.setState({
                    subjects: subjects.data,
                    question: question.data
                })
            });
    }

    getSubjects() {
        return axiosClient.get(apiPaths.getSubjects);
    }

    getQuestion() {
        return axiosClient.get(
            apiPaths.getQuestion.replace('{}', this.props.match.params.question_id));
    }

    handleSubjectOnChange(value) {
        const { subjects } = this.state;

        const subject = subjects.filter(subject => subject.id === value.value)[0];

        this.setState({
            topics: subject.topicDtos
        });
    }

    // handleTopicOnChange(value) {
    //     this.setState({
    //         topic: value.value
    //     })
    // }

    handleSubmit(value) {

        // const { question, answers, explanation,topic } = value;

        // axiosClient.post(apiPaths.addQuestion.replace('{}', topic.value), {
        //     questionText: question,
        //     answerDtos: answers,
        //     explanation: explanation,
        //     status: 'PENDING',
        //     studentId:'15ba3454-65e2-439c-8519-9ba135cf97b9' //remove moock after login implementation
        // }).then(() => {
        //     // TODO add modal here
        // })
        //     .catch((err) => console.log(err)); //TODO catch error here
    }

    render() {

        console.log(this.state);

        const { subjects, question, topics, selectedSubject, selectedTopic } = this.state;

        return (
            <div>
                {question &&<UpdateQuestionForm
                    onSubmit={this.handleSubmit}
                    handleSubjectOnChange={this.handleSubjectOnChange}
                    subjects={subjects}
                    topics={topics}
                    question={question}
                />}
            </div>
        );
    }
}

export default withRouter(UpdateQuestionContainer);
