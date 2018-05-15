import { Component } from 'react';
import PropTypes from 'prop-types';
import Keyboardist from 'keyboardist';

class Keyboard extends Component {
  subs = [];

  static propTypes = {
    eventName: PropTypes.oneOf(['keydown', 'keyup']),
    bindings: PropTypes.objectOf(PropTypes.func),
  };

  static defaultProps = {
    eventName: 'keydown',
    bindings: {},
  };

  constructor(props) {
    super(props);
    this.keyboardListener = Keyboardist(props.eventName);
  }

  componentDidMount() {
    const { bindings } = this.props;

    Object.keys(bindings).forEach(eventName => {
      const callback = bindings[eventName];
      const subscription = this.keyboardListener.subscribe(eventName, callback);
      this.subs.push(subscription);
    });
  }

  componentWillUnmount() {
    this.subs.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    return null;
  }
}

export default Keyboard;
