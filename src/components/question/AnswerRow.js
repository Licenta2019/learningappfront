import React, { Component } from 'react';

// export const renderAnswers = ({ fields, meta: { error, submitFailed } }) => (
//     <ul>
//       <li>
//         <button type="button" onClick={() => fields.push({})}>
//           Add Question
//         </button>
//         {submitFailed && error && <span>{error}</span>}
//       </li>
//       {fields.map((answer, index) => (
//         <li key={index}>
//           <button
//             type="button"
//             title="Remove"
//             onClick={() => fields.remove(index)}
//           />
//           <h4>Answer #{index + 1}</h4>
//           <Field
//             name={`${answer}.text`}
//             type="text"
//             component="textarea"
//             label="Answer"
//           />
//           <Field
//             name={`${answer}.isTrue`}
//             type="checkbox"
//             component="textarea"
//           />
//         </li>
//       ))}
//     </ul>
//   )

// export const answerRow = (props) => {
//     return (
//         <div>
//             <textarea
//             {...props}
//             />
//             <input type="checkbox" selected={isValid} />
//         </div>
//     );
// }

class AnswerRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answer: "",
            isTrue: false
        };

        this.handleAnswerOnChange = this.handleAnswerOnChange.bind(this);
        this.handleIsTrueOnChange = this.handleIsTrueOnChange.bind(this);
    }

    handleAnswerOnChange(event) {
        this.setState({
            answer: event.target.value
        });
    }

    handleIsTrueOnChange(event) {
        this.setState({
            isTrue: event.target.value
        });
    }

    render() {
        const { answer, isTrue } = this.state;

        return (
            <div>
                <textarea name={answer} onChange={this.handleAnswerOnChange} value={answer} />
                <input type="checkbox" selected={isTrue} onChange={this.handleIsTrueOnChange} />
            </div>
        );
    }
}

export default AnswerRow;
