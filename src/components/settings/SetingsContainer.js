import React, { Component } from 'react';
import LanguageComutator from '../shared/LanguageComutator';
import { injectIntl } from 'react-intl';

class SettingsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: null,
            isDarkTheme: true
        }
    }

    render() {
        return (
            <LanguageComutator
                intl={this.props.intl}
            />
        );
    }
}

export default injectIntl(SettingsContainer);
