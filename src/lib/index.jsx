// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Keyboardist from 'keyboardist';

const listeners = {
  keydown: Keyboardist('keydown'),
  keyup: Keyboardist('keyup'),
};

type Props = {
  eventName: 'keydown' | 'keyup',
  bindings: { [string]: func },
};

class Keyboard extends React.Component<Props> {
  subs = [];

  keyboardListener: func;

  static defaultProps = {
    eventName: 'keydown',
    bindings: {},
  };

  constructor(props: Props) {
    super(props);
    this.keyboardListener = listeners[props.eventName];
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
