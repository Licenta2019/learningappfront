import React, { Component } from 'react';

class AnswerRow extends Component{

    constructor(props){
        super(props);

        this.state = {
            answerText: null,
            isTrue: false
        };
        
    this.handleAnswerOnChange = this.handleAnswerOnChange.bind(this);
    this.handleIsTrueOnChange = this.handleIsTrueOnChange.bind(this);
    }

    handleAnswerOnChange(event){
        this.setState({
            answerText: event.target.value
        });
    }

    handleIsTrueOnChange(event){
        this.setState({
            isTrue: event.target.value
        });
    }

    render() {
        const {answerText,isValid} = this.state;

        return (
            <div>
                <textarea onChange = {this.handleAnswerOnChange} value = {answerText}/>
                <input type = "checkbox" selected = {isValid} onChange = {this.handleIsTrueOnChange}/>
            </div>
        );
    }
}

export default AnswerRow;