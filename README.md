# React Keyboardist

An easy way to add keyboard shortcuts to your react applications. Powered by [keyboardist.js](https://github.com/soska/keyboardist.js)

[Click here for a simple demo](http://soska.github.io/react-keyboardist/docs/index.html)

## How to use

Just pass a dictionary with the shape of `{keyName : [function]}` via the `bindings` property and they will be automatically binded when the component mounts.

```javascript
import Keyboardist from 'react-keyboardist';

class App extends React.Component {
  //... state methods would go here

  render() {
    return (
      <React.Fragment>
        <Keyboardist
          bindings={{
            '/': this.focusSearch,
            '+': this.showMenu,
            '?': this.showHelp,
            esc: this.logOut,
          }}
        />
        <RestOfTheApp />
      </React.Fragment>
    );
  }
}
```

## Installation

```
$ yarn add react-keyboardist

or

$ npm install --save react-keyboardist
```

## Other Events

By default React Keyboardist will listen to `keydown` events, but you can use `keyup` instead.

```javascript
<Keyboardist
  eventName="keyup"
  bindings={{
    '/': this.focusSearch,
    '+': this.showMenu,
    '?': this.showHelp,
    esc: this.logOut,
  }}
/>
```
