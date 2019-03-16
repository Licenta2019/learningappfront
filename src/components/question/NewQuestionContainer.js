import React, { Component } from 'react';
import NewQuestionForm from './NewQuestionForm';
import {withRouter} from 'react-router-dom';
import axiosClient from './../../axios/axiosClient';
import apiPaths from './../../axios/apiPaths';

const topicId = '374c6260-2bc8-4a54-acc4-12a2e082f876';
class NewQuestionContainer extends Component{

    constructor(props){
        super(props);

        this.state = {
            topicId : null //todo set this from props
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(value){
        
        const {question, answers} = value;

        answers.forEach(a => {
            console.log(a.isCorrect);
        });

        axiosClient.post(apiPaths.addQuestion.replace('{}','374c6260-2bc8-4a54-acc4-12a2e082f876'),{
            questionText: question,
            answerDtos: answers
        }).then(()=>{
            // TODO add modal here
        })
        .catch((err)=>console.log(err));
    }    

    render(){
        return (
            <div>
                <NewQuestionForm 
                    onSubmit = {this.handleSubmit}
                />
            </div>
        );
    }
}

export default withRouter(NewQuestionContainer);

