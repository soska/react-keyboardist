// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import createListener from 'keyboardist';

const listeners = {
  keydown: createListener('keydown'),
  keyup: createListener('keyup'),
};

type Props = {
  eventName: 'keydown' | 'keyup',
  bindings: { [string]: any },
  monitor?: any,
};

class Keyboard extends React.PureComponent<Props> {
  subs = [];

  keyboardListener: any;

  static defaultProps = {
    eventName: 'keydown',
    bindings: {},
    monitor: null,
  };

  constructor(props: Props) {
    super(props);
    this.keyboardListener = listeners[props.eventName];
  }

  componentDidMount() {
    const { bindings, monitor } = this.props;

    Object.keys(bindings).forEach(eventName => {
      const callback = bindings[eventName];
      const subscription = this.keyboardListener.subscribe(eventName, callback);
      this.subs.push(subscription);
    });

    if (monitor) {
      this.keyboardListener.setMonitor(monitor);
    }
  }

  componentWillUnmount() {
    this.subs.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    return null;
  }
}

export default Keyboard;
