# 🎹 React Keyboardist

![](assets/cover.png)

React Keyboardist offers a simple and declarative way to add keyboard shortcuts to your react applications. It is just a React Wrapper for [🎹Keyboardist](https://github.com/soska/keyboardist.js).

[Click here for a simple demo](http://soska.github.io/react-keyboardist/docs/index.html)

## TOC

* [Installation](#installation)
* [Global Listener](#global)
  * [How to Use](#how-to-use)
  * [Other Events](#other-events)
  * [Multiple Listeners For A Key](#multiple-listeners)
  * [Event Monitor](#monitor)
* [KeyboardInput](#keyboard-input)
  * [How to Use](#how-to-use-input)
  * [Textarea](#textarea)
* [Examples](#examples)
  * [Integration with React Router](#react-router)

## Installation<a name="installation"></a>

```
$ yarn add react-keyboardist

or

$ npm install --save react-keyboardist
```

## Global Listener<a name="global"></a>

The default export `<Keyboardist/>` provides a global listener attached to the document element that will listen for every key event except those that happen inside input elements (e.g. `<input/>`,`<textarea/>`). This is useful, for example, to have keystrokes that activate different parts of your UI.

If you need to listen for keyboard events inside an input using a similar API, React Keyboardist also comes with a [KeyboardInput](#keyboard-input) component.

### How to use<a name="how-to-use"></a>

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
            Slash: this.focusSearch,
            Period: this.showMenu,
            Escape: this.logOut,
            KeyK: this.next,
            KeyJ: this.prev,
          }}
        />
        <RestOfTheApp />
      </React.Fragment>
    );
  }
}
```

All the subscription objects will be automatically unsuscribed when the component unmounts so you can use it as any other component in your component hierarchy.

### Other Events<a name="other-events"></a>

By default React Keyboardist will listen to `keydown` events, but you can use `keyup` instead.

```javascript
<Keyboardist
  eventName="keyup"
  bindings={{
    Slash: this.focusSearch,
    Period: this.showMenu,
    Escape: this.logOut,
    KeyK: this.next,
    KeyJ: this.prev,
  }}
/>
```

### Multiple listeners for a Key<a name="multiple-listeners"></a>

You can add multiple listeners for the same key, and they will be executed
starting from the last one. If one of the listeners returns `false` the execution chain will stop. This is useful when you want to override a key in a child component.

```javascript
const App = ({ openDialog, closeDialog, isDialogOpen, handleLogout }) => (
  <div>
    <Keyboardist
      bindings={{
        Enter: openDialog,
        Escape: handleLogout,
      }}
    />
    {isDialogOpen && <ModalDialog onClose={closeDialog} />}
  </div>
);

const ModalDialog = ({ onClose }) => {
  const bindings = {
    Escape: () => {
      onClose();
      // this will prevent the Escape binding in the parent component to be triggered.
      return false;
    },
  };
  return (
    <div className="dialog">
      <Keyboard bindings={bindings} />
      <DialogContentOrWhatever />
    </div>
  );
};
```

### Event Monitor<a name="monitor"></a>

The `monitor` property allows you to either pass a monitor function or just set it to `true` to use Keyboardist's default monitor. You can [read more about Keyboardist monitor over here.](https://github.com/soska/keyboardist.js#key-monitor)

```javascript
<Keyboardist
  bindings={bindings}
  monitor={(keyName, matched) => {
    // do something
  }}
/>
```

## KeyboardInput<a name="keyboard-input"></a>

Sometimes you want to listen to key events inside an input or textarea element, for example, to make a keyboard-enabled live search or to add keyboard functions inside an editor.

### How to use<a name="how-to-use-input"></a>

`KeyboardInput` has pretty much the same API as the global listener, except that instead of not rendering anything, it will render either an `<input/>` component (by default) or a `<textarea/>` component.

The properties for `KeyboardInput` are `bindings`, `eventName`, `monitor` and `component`, every other property will be forwarded to the rendered component.

```javascript
import { KeyboardInput } from 'react-keyboardist';

class App extends React.Component {
  //... state methods would go here

  render() {
    return (
      <React.Fragment>
        <KeyboardInput
          className={'tag-selector'}
          onFocus={this.showOptions}
          bindings={{
            Up: this.prevOption,
            Down: this.nextOption,
            Space: this.selectOption,
          }}
        />
        <RestOfTheApp />
      </React.Fragment>
    );
  }
}
```

### Textarea<a name="textarea"></a>

If you want the component to render a `textarea` element instead of an `input`, you can use the `component` property.

```javascript
<Keyboardist component={'textarea'} bindings={bindings} />
```

## Examples<a name="examples"></a>

If you want to see all the capabilites of React Keyboardist, here's a [really contrived demo](http://soska.github.io/react-keyboardist/docs/index.html) and you can find the source for that in the `docs` folder.

### React Router + Keyboardist<a name="react-router"></a>

If your application is some kind of Admin Dashboard, you may be using React-Router for the different sections of the app. [React Router + Keyboardist](https://githuv.com/soska/react-router-plus-keyboardist) offers a drop-in replacement for the `Route` component that allows to assign a keyboard shortcut to every route.

Here's [a blog post](https://armandososa.org/2018/6/12/react-router-plus-keyboardist/) with the reasoning behind it.
