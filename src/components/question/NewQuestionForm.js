import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Button} from 'reactstrap';
import AnswerRow from './AnswerRow';
class NewQuestionForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            question: null,
            answer: null,
            isValid:false
        };
        
        this.handleQuestionOnChange = this.handleQuestionOnChange.bind(this);
        this.handleAnswerOnChange = this.handleAnswerOnChange.bind(this);
        this.handleIsValidOnChange = this.handleIsValidOnChange.bind(this);
       
    }

    handleQuestionOnChange(event){
        this.setState({
            question: event.target.value
        });
    }

    handleAnswerOnChange(event){
        this.setState({
            answer: event.target.value});
    }

    handleIsValidOnChange(event){
        this.setState({
            isValid: event.target.value});
    }

    // handleAddAnswer(answer){
    //     let newAnswers = this.state.answers;
    //     newAnswers.push(answer);

    //     this.setState({
    //         answers:newAnswers
    //     });
    // }

    render(){

        const {handleSubmit} = this.props;
        const {question, answer, isValid} = this.state;

        return (
            <form onSubmit = {handleSubmit}>
                <Field 
                    name = "question"
                    component = "textarea"
                    value = {question}
                    onChange = {this.handleQuestionOnChange}
                />
                <Field 
                    name = "answer"
                    component = "textarea"
                    value = {answer}
                    onChange = {this.handleAnswerOnChange}
                />
                <Field 
                    name = "isValid"
                    component = "input"
                    type = "checkbox"
                    value = {isValid}
                    onChange = {this.handleIsValidOnChange}
                />

                {/* <input name = "question" type = "textarea" value = {question} onChange = {this.handleQuestionOnChange}/>
                <input name = "answer" type = "textarea" value = {answer} onChange = {this.handleAnswerOnChange}/>
                <input name = "isValid" type = "checkbox" value = {isValid} onChange = {this.handleChangeIsValid} /> */}
                {/* <AnswerRow/> */}
                <Button type = "submit">Submit</Button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newQuestionForm',
    fields: ['question','answer','isValid']
    // validate
})(NewQuestionForm)