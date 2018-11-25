import React, { PureComponent } from 'react';
import { wrapper, left, right, down, up, button, active } from './ArrowKeys.module.css';


class ArrowKeys extends PureComponent {
  constructor(props) {
      super(props);

      this.keyUpListener = null;
      this.keyDownListener = null;
  }

  onDown = (event) => {
    const { name } = event.target;
    const { keys, onChange } = this.props;
    const newKeys = { ...keys, [name]: true };
    onChange(newKeys);
  }
  
  onUp = (event) => {
    const { name } = event.target;
    const { keys, onChange } = this.props;
    const newKeys = { ...keys, [name]: false };
    onChange(newKeys);
  }
  
  componentDidMount() {
    const { onDown, onUp } = this;

    this.keyDownListener = (e) => {
      const { keys } = this.props;
      switch(e.code) {
        case 'ArrowUp': return !keys['up'] && onDown({ target: { name: 'up' }});
        case 'ArrowDown': return !keys['down'] && onDown({ target: { name: 'down' }});
        case 'ArrowLeft': return !keys['left'] && onDown({ target: { name: 'left' }});
        case 'ArrowRight': return !keys['right'] && onDown({ target: { name: 'right' }});
        default: return;
      }
    };

    this.keyUpListener = (e) => {
      switch(e.code) {
        case 'ArrowUp': return onUp({ target: { name: 'up' }});
        case 'ArrowDown': return onUp({ target: { name: 'down' }});
        case 'ArrowLeft': return onUp({ target: { name: 'left' }});
        case 'ArrowRight': return onUp({ target: { name: 'right' }});
        default: return;
      }
    };

    document.addEventListener('keydown', this.keyDownListener);
    document.addEventListener('keyup', this.keyUpListener);
  }

  render() {
    const {
      props: {
        keys: { left: l, right: r, up : u, down: d }
      },
      onDown, onUp,
    } = this;
    return (
      <div className={wrapper}>
          <button
            name="left"
            className={`${left} ${button} ${l ? active : ''}`}
            onTouchStart={onDown}
            onTouchEnd={onUp}
            onMouseDown={onDown}
            onMouseUp={onUp}>
            Left
          </button>
          <button
            name="right"
            className={`${right} ${button} ${r ? active : ''}`}
            onTouchStart={onDown}
            onTouchEnd={onUp}
            onMouseDown={onDown}
            onMouseUp={onUp}>
            Right
            </button>
          <button
            name="up"
            className={`${up} ${button} ${u ? active : ''}`}
            onTouchStart={onDown}
            onTouchEnd={onUp}
            onMouseDown={onDown}
            onMouseUp={onUp}>
            Up
          </button>
          <button
            name="down"
            className={`${down} ${button} ${d ? active : ''}`}
            onTouchStart={onDown}
            onTouchEnd={onUp}
            onMouseDown={onDown}
            onMouseUp={onUp}>
            Down
          </button>
        </div>
      );
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.keyDownListener);
      document.removeEventListener('keyup', this.keyUpListener);
    }
  }

  // props
  // - onChange
  // - keys
  
  export default ArrowKeys;