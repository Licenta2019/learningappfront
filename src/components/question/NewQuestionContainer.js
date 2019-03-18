import React, { Component } from 'react';
import NewQuestionForm from './NewQuestionForm';
import { withRouter } from 'react-router-dom';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';
import Select from 'react-select';
import { Row } from 'reactstrap';

const topicId = '374c6260-2bc8-4a54-acc4-12a2e082f876';
class NewQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicId: null, //todo set this from props
            subjects: [],
            topics: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubjectOnChange = this.handleSubjectOnChange.bind(this);
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

        console.log(subject);

        this.setState({
            topics: subject.topicDtos
        });
    }

    handleSubmit(value) {

        const { question, answers, explanation } = value;

        axiosClient.post(apiPaths.addQuestion.replace('{}', topicId), {
            questionText: question,
            answerDtos: answers,
            explanation: explanation
        }).then(() => {
            // TODO add modal here
        })
            .catch((err) => console.log(err)); //TODO catch error here
    }

    render() {

        const { subjects, topics } = this.state;

        const subjectsList = subjects.map(subject => { return { value: subject.id, label: subject.name } });

        const topicsList = topics.map(topic => { return { value: topic.id, label: topic.name } });

        return (
            <div>
                <Row>
                    <Select
                        options={subjectsList}
                        onChange={this.handleSubjectOnChange}
                    />
                    <Select
                        options={topicsList}
                    />
                </Row>
                <NewQuestionForm
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default withRouter(NewQuestionContainer);
