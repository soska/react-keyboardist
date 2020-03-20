import { useEffect } from "react";
import createListener from "keyboardist";

// cache and lazy-load the global listeners
let __listeners = {};
const getListener = name => {
  if (!__listeners[name]) {
    __listeners[name] = createListener(name);
  }
  return __listeners[name];
};

/**
 * Hook to support the old <Keyboardist bindings={{...}} /> usecase
 */
export const useKeyboardBindings = ({
  eventName = "keydown",
  bindings = {},
  monitor = null,
}) => {
  useEffect(() => {
    const keyboardListener = getListener(eventName);

    const subs = [];

    Object.keys(bindings).forEach(keyName => {
      const fn = bindings[keyName];
      const subscription = keyboardListener.subscribe(keyName, fn);
      subs.push(subscription);
    });

    if (monitor) {
      keyboardListener.setMonitor(monitor);
    }

    return () => {
      subs.forEach(subscription => subscription.unsubscribe());
    };
  }, []);
};

/**
 * set only one keyboard binding
 */
export const useKeyboardBinding = (
  keyName = "",
  fn = () => {},
  eventName = "keydown"
) => {
  useEffect(() => {
    const keyboardListener = getListener(eventName);
    const subscription = keyboardListener.subscribe(keyName, fn);
    return subscription.unsubscribe;
  }, []);
};

/**
 * Set the keyboardist monitor
 */
export const useKeyboardMonitor = monitor => {
  useEffect(() => {
    return keyboardListener.setMonitor(monitor);
  }, []);
};
