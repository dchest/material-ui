import React from 'react';
import ContextPure from '../mixins/context-pure';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    baseTheme,
  } = state.muiTheme;

  return {
    root: {
      position: 'relative',
      paddingLeft: baseTheme.spacing.desktopGutterLess,
      paddingRight: baseTheme.spacing.desktopGutterLess,
    },
  };
}

const FlatButtonLabel = React.createClass({

  propTypes: {
    label: React.PropTypes.node,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    ContextPure,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      return {
        spacingDesktopGutterLess: muiTheme.rawTheme.spacing.desktopGutterLess,
      };
    },
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || nextContext.muiTheme,
    });
  },

  render: function() {
    const {
      label,
      style,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <span style={prepareStyles(Object.assign(styles.root, style))}>{label}</span>
    );
  },
});

export default FlatButtonLabel;
