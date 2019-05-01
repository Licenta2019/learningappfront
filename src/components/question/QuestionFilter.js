import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Label } from 'reactstrap';
import { mapOptions } from '../helpers/selectHelper';

class QuestionListing extends Component {

    render() {
        const { subjects, handleSubjectOnChange, topics, handleTopicOnChange, topicsDisabled } = this.props;

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

        return (
            <Row>
                <div className="subjectDiv">
                    <Label>Choose a subject:</Label>
                    <Select
                        name="subject"
                        placeholder={"Subject"}
                        onChange={handleSubjectOnChange}
                        options={mapOptions(subjects)}
                        styles={customStyles}
                    />
                </div>
                <div className="topicDiv">
                    <Label>Choose a topic:</Label>
                    <Select
                        name="topic"
                        placeholder={"Topic"}
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