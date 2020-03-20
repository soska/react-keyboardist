import * as React from "react";
import createListener from "keyboardist";

class Input extends React.PureComponent {
  subs = [];

  static defaultProps = {
    component: "input",
    eventName: "keydown",
    bindings: {},
    monitor: null,
  };

  componentDidMount() {
    const { bindings, monitor, eventName } = this.props;

    this.keyboardListener = createListener(eventName, this.element);

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
    const {
      component: Component,
      eventName,
      bindings,
      monitor,
      ...props
    } = this.props;
    return <Component ref={el => (this.element = el)} {...props} />;
  }
}

export default Input;
