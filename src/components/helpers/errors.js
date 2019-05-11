import { SubmissionError } from 'redux-form';

export const throwSubmissionError = (message) => {
    throw new SubmissionError({ _error: message })
}
