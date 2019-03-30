import React, { Component } from 'react';
import UpdateQuestionForm from './UpdateQuestionForm';
import { withRouter } from 'react-router-dom';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import { Row } from 'reactstrap';

class UpdateQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjectOptions: [],
            topicsOptions: [], 
            selectedSubject: '',
            selectedTopic:'',
            topics:[],
            question: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
        // this.handleTopicOnChange = this.handleTopicOnChange.bind(this);
    }

    componentDidMount() {

        console.log(this.props.match);
        
        console.log(this.props.location);

        axiosClient.get(apiPaths.getSubjects)
            .then((subjects) => {
                this.setState({
                    subjectsOptions: subjects.data
                })
            });
    }

    // handleSubjectOnChange(value) {
    //     const { subjects } = this.state;

    //     const subject = subjects.filter(subject => subject.id === value.value)[0];

    //     this.setState({
    //         topics: subject.topicDtos,
    //         topicDisabled : false
    //     });
    // }

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
        const { subjects, topics, subject, topic,topicDisabled } = this.state;

        return (
            <div>
                <UpdateQuestionForm
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

export default withRouter(UpdateQuestionContainer);
