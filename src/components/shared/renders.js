import React from 'react';
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

export const renderSlider = ({ meta: { touched, error }, ...props }) => (
    <div>
        <Slider
            {...props}
            value={props.input.value}
            onChange={props.input.onChange}
        />
        {touched && (error && <span className="text-danger">{error}</span>)}
    </div>
);
export const renderSelect = ({ input, onSelectChange, options, meta: { touched, error }, isDisabled, ...props }) => {

    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#3b4148",
            color: "#606468",
            font: "14px",
            borderColor: null,
            "&:hover": {
                borderColor: "grey"
            }
        }),
        menuList: base => ({
            ...base,
            background: "#3b4148",
            color: "#606468",
            border: "1px solidgrey"
        }),
        input: base => ({
            ...base,
            background: "#3b4148", color: "#606468",
            font: "14px"
        }),
        dropdownIndicator: base => ({
            ...base,
            background: "#2e3338"
        }), option: (styles, state) => ({
            ...styles,
            color: state.isSelected ? "#FFF" : "#606468",
            backgroundColor: state.isSelected ? "#c70909" : styles.color,
            borderBottom: "1px solid rgba( 0, 0, 0, 0.125)",
            "&:hover": {
                color: "#FFF",
                backgroundColor: "#c70909"
            }
        }),
        singleValue: (styles, state) => ({
            ...styles,
            color: "#606468"
        })
    };

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
                styles={customStyles}
            />
            {touched && (error && <span className="text-danger">{error}</span>)}
        </div>
    );
};

export const renderTableHeader = (columns, intl) => {
    let tableHeader = [];

    columns.forEach(column => {
        tableHeader.push({
            Header: intl.formatMessage({ id: `label.table.${column}` }),
            accessor: column
        });
    })
    
    return tableHeader;
};