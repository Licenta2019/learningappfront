import React, { Component } from 'react';
import Select from 'react-select';
import { Row } from 'reactstrap';
import { mapOptions } from '../helpers/selectHelper';

class QuestionListing extends Component {

    render() {
        const { subjects, handleSubjectOnChange, topics, handleTopicOnChange, topicsDisabled } = this.props;

        return (
            <Row>
                <Select
                    name="subject"
                    placeholder={"Subject"}
                    onChange={handleSubjectOnChange}
                    options={mapOptions(subjects)}
                />
                <Select
                    name="topic"
                    placeholder={"Topic"}
                    onChange={handleTopicOnChange}
                    options={mapOptions(topics)}
                    disabled={topicsDisabled}
                />
            </Row>
        );
    }
}

export default QuestionListing;