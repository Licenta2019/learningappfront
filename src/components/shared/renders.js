import React from 'react';
import Select from 'react-select';

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
            <textarea
                {...input}
                {...props}
            />
            {touched && (error && <span className="text-danger">{error}</span>)}
        </div>
    )
};

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
          { ...input }
          { ...props }
          options={ options }
          onChange={ handleInputChange }
          onBlur={ handleOnBlur }
          isDisabled={ isDisabled }
        />
        { touched && (error && <span className="text-danger">{ error }</span>) }
      </div>
    );
  };
