import React, { Component } from 'react';
import LanguageComutator from './shared/LanguageComutator';

class SettingsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: null,
            isDarkTheme: true
        }
    }

    render() {
        <LanguageComutator />
    }

}

export default injectIntl(SettingContainer);
