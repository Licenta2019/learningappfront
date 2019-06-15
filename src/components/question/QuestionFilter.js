import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Label } from 'reactstrap';
import { mapOptions } from '../helpers/selectHelper';
import {customStyles} from '../shared/customSelectStyle';

class QuestionListing extends Component {

    render() {
        const { subjects, handleSubjectOnChange, topics, handleTopicOnChange, topicsDisabled, intl } = this.props;

        return (
            <Row>
                <div className="subjectDiv">
                    <Label>Choose a subject:</Label>
                    <Select
                        name="subject"
                        placeholder={intl.formatMessage({ id: 'placeholder.form.subject' })}
                        onChange={handleSubjectOnChange}
                        options={mapOptions(subjects)}
                        styles={customStyles}
                    />
                </div>
                <div className="topicDiv">
                    <Label>Choose a topic:</Label>
                    <Select
                        name="topic"
                        placeholder={intl.formatMessage({ id: 'placeholder.form.topic' })}
                        onChange={handleTopicOnChange}
                        options={mapOptions(topics)}
                        disabled={topicsDisabled}
                        styles={customStyles}
                    />
                </div>
            </Row>
        );
    }
}

export default QuestionListing;