import React from 'react';

export const Toast = ({ content }) => (
    <div>
        {content}
    </div>
)

export const ToastWithButton = ({ content, buttonText, onClickButton }) => (
    <div>
        {content}
        <button onClick={onClickButton}>{buttonText}</button>
    </div>
)
