import React, { Component } from 'react';
import Select from 'react-select';
import axiosClient from '../../axios/axiosClient';
import apiPaths from '../../axios/apiPaths';
import { Container, Row, Col } from 'reactstrap';
import { mapOptions } from '../helpers/selectHelper';

export default class QuestionListing extends Component {

    render() {
        const {subjects,handleSubjectOnChange,topics,handleTopicOnChange,topicsDisabled} = this.props;

        return (
            <div>
                <Row>
                    <Col>
                        <Select
                            name="subject"
                            placeholder={"Subject"}
                            onChange={handleSubjectOnChange}
                            options={mapOptions(subjects)}
                        />
                    </Col>
                    <Col>
                        <Select
                            name="topic"
                            placeholder={"Topic"}
                            onChange={handleTopicOnChange}
                            options={mapOptions(topics)}
                            disabled={topicsDisabled}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
