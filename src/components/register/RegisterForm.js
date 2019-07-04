import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';

class RegisterForm extends Component {

    render() {

        console.log("register from");

        return (<div>

            <TextareaAutosize value="sdfgrsehg">
                fsdjklkjhg
            </TextareaAutosize>

        </div>);
    }
}

export default RegisterForm;