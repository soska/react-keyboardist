import React from 'react';
import { render } from 'react-dom';
import Keyboardist from '../../lib';
import './styles.css';

const List = ({ items, selectedItem }) => {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li
          className={`list-item ${
            index !== selectedItem ? '' : 'list-item--selected'
          }`}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

class KeyboardList extends React.Component {
  state = {
    selectedItem: 0,
  };

  static defaultProperties = {
    onSelect: () => {},
  };

  next = () => {
    let nextItem = this.state.selectedItem + 1;
    if (nextItem >= this.props.items.length) {
      nextItem = 0;
    }
    this.setState({ selectedItem: nextItem });
  };

  prev = () => {
    let nextItem = this.state.selectedItem - 1;
    if (nextItem < 0) {
      nextItem = this.props.items.length - 1;
    }
    this.setState({ selectedItem: nextItem });
  };

  superNext = () => {
    let nextItem = this.state.selectedItem + 3;
    if (nextItem >= this.props.items.length) {
      nextItem = this.props.items.length - 1;
    }
    this.setState({ selectedItem: nextItem });
  };

  superPrev = () => {
    let nextItem = this.state.selectedItem - 3;
    if (nextItem < 0) {
      nextItem = 0;
    }
    this.setState({ selectedItem: nextItem });
  };

  reset = () => {
    this.setState({ selectedItem: 0 });
  };

  submit = () => {
    this.props.onSelect(this.state.selectedItem);
  };

  render() {
    return (
      <React.Fragment>
        <Keyboardist
          bindings={{
            down: this.next,
            'shift+down': this.superNext,
            up: this.prev,
            'shift+up': this.superPrev,
            enter: this.submit,
            esc: this.reset,
          }}
        />
        <List items={items} selectedItem={this.state.selectedItem} />
      </React.Fragment>
    );
  }
}

const items = [
  'Rick Wakeman',
  'Keith Emerson',
  'Jordan Rudess',
  'Tony Banks',
  'Richard Wright',
  'Chick Corea',
  'Stevie Wonder',
  'Herbie Hancock',
  'Aleks Syntek',
  'Chico Che',
];

function Demo() {
  return (
    <div>
      <h1>Select your favorite keyboardist</h1>
      <p className="instructions">
        Use up and down arrows to higlight a name / Hold down <kbd>Shift</kbd>{' '}
        to move three names at a time / press <kbd>Esc</kbd> to reset.
      </p>
      <KeyboardList
        items={items}
        onSelect={index => {
          alert(`You selected ${items[index]}`);
        }}
      />
      <p className="footer">
        This is a demo built with{' '}
        <a href="https://github.com/soska/react-keyboardist">
          React Keyboardist
        </a>
      </p>
    </div>
  );
}

render(<Demo />, document.getElementById('app'));
