import React, { Component } from 'react';
import UpdateQuestionForm from './UpdateQuestionForm';
import { withRouter } from 'react-router-dom';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import routePaths from './../../routes/routePaths';
import { UPDATE_QUESTION } from '../constants/question';

class UpdateQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subjects: [],
            topics: [],
            question: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
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

    handleUpdate(formObject) {
        //update question and send notification
        axiosClient.post(apiPaths.updateQuestions.replace('{}', formObject.topicId).replace('[]', formObject.id), formObject)
            .then(() => {
                this.props.history.push(routePaths.homepage);
            })
            .catch((err) => console.log(err)); //TODO catch error here
    }

    handleValidate(formObject) {
        //validate question 
        console.log(formObject);
        axiosClient.put(apiPaths.validateQuestions.replace('{}', formObject.topicId).replace('[]', formObject.id), formObject)
            .then(() => {
                this.props.history.push(routePaths.homepage);
            })
            .catch((err) => console.log(err)); //TODO catch error here
    }

    handleSubmit(values) {
        const { question } = this.state;

        const formObject = {
            'id': question.id,
            'topicId': values.topic.value,
            'questionText': values.questionText,
            'answerDtos': values.answers,
            'explanation': values.explanation,
            'difficulty': values.difficulty,
            'notificationMessage': values.message
        };

        return values.submitType === UPDATE_QUESTION ? this.handleUpdate(formObject) : this.handleValidate(formObject);
    }
    render() {
        const { subjects, question } = this.state;

        const subject = subjects && subjects.filter(subject => subject.id === question.subjectId)[0];
        const topic = subject && subject.topicDtos.filter(topic => topic.id === question.topicId)[0];

        return (
            <div>
                {subjects && question && <UpdateQuestionForm
                    onSubmit={this.handleSubmit}
                    initialValues={{
                        questionText: question.questionText,
                        explanation: question.explanation,
                        subject: { value: question.subjectId, label: subject.name },
                        topic: { value: question.topicId, label: topic.name },
                        answers: question.answerDtos
                    }}
                    handleSubjectOnChange={this.handleSubjectOnChange}
                    subjects={subjects}
                    topics={subject.topicDtos}
                />}
            </div >
        );
    }
}

export default withRouter(UpdateQuestionContainer);
