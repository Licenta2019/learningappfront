import React from 'react';

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
