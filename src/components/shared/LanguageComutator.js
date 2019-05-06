import React, { Component } from 'react';
import Select from 'react-select';
import { changeLanguage, ENGLISH, ROMANIAN, i18config } from '../helpers/language';
import { mapLabels } from '../helpers/selectHelper';

class LanguageComutator extends Component {

    render() {

        return (
            <div>
                <Select
                    name="language"
                    onChange={changeLanguage}
                    options={mapLabels([ENGLISH, ROMANIAN])}
                    defalutValue={i18config.locale}
                />
            </div>
        );
    }
}

export default LanguageComutator;
