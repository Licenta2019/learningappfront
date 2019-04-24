import React, { Component } from 'react';
import Select from 'react-select';
import TextareaAutosize from 'react-autosize-textarea';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

export const renderField = ({ input, meta: { touched, error }, ...props }) => {

    return (
        <div>
            <input
                {...input}
                {...props}
            />
            {touched && (error && <span className="text-danger">{error}</span>)}
        </div>
    )
};

export const renderTextarea = ({ input, meta: { touched, error }, ...props }) => {

    return (
        <div>
            <TextareaAutosize
                {...input}
                {...props}
            />
            {touched && (error && <span className="text-danger">{error}</span>)}
        </div>
    )
};

export const renderSlider = ({meta: { touched, error }, ...props}) => (
    <div>
        <Slider
            {...props}
            value={props.input.value}
            onChange={props.input.onChange}
        />
        {touched && (error && <span className="text-danger">{error}</span>)}
    </div>
)

// export class CustomSlider extends Component {
//     constructor(props) {
//         super(props);

//         const { orientation, min, max } = this.props;

//         this.state = {
//             orientation: orientation,
//             volume: 0,
//             min: min,
//             max: max
//         }
//     }

//     handleOnChange = (value) => {
//         this.setState({
//             volume: value
//         })
//     }

//     render() {
//         let { volume, orientation, min, max } = this.state
//         return (
//             <Slider
//                 value={volume}
//                 orientation={orientation}
//                 min={min}
//                 max={max}
//                 onChange={this.handleOnChange}
//             />
//         )
//     }
// }

export const renderSelect = ({ input, onSelectChange, options, meta: { touched, error }, isDisabled, ...props }) => {

    function handleInputChange(option) {

        option ? input.onChange(option) : input.onChange("");
        if (typeof onSelectChange === "function" && option) {
            onSelectChange(option);
        }
    }

    function handleOnBlur() {
        input.onBlur();
    }

    return (
        <div>
            <Select
                {...input}
                {...props}
                options={options}
                onChange={handleInputChange}
                onBlur={handleOnBlur}
                isDisabled={isDisabled}
            />
            {touched && (error && <span className="text-danger">{error}</span>)}
        </div>
    );
};
