import React, { Component } from 'react'
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as i18nActions from '../../actions/i18';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

const withIntl = WrappedComponent => {

  class Intl extends Component {

    componentDidMount() {
      if (!this.props.i18n.messages) {
        this.props.setLanguage();
      }
    } 

    render() {
      const { i18n } = this.props;

      if (!i18n.messages) {
        return null;
      }

      return (
        <IntlProvider key={ i18n.locale } messages={ i18n.messages } locale={ i18n.locale }>
          <WrappedComponent { ...this.props } />
        </IntlProvider>
      )
    }
  }

  Intl.propTypes = {
    i18n: PropTypes.object,
    setLanguage: PropTypes.func
  };
  
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Intl));
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...i18nActions
    // ...accountActions
  }, dispatch);
};

export default withIntl;
