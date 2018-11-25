import React, { Component, Fragment } from 'react';
import ArrowKeys from '../ArrowKeys';
import Display from '../Display';

import { startListeningForTheObstacles, stopListeningForTheObstacles } from '../../api/obstacles';
import sendKeyInfo from '../../api/sendKeyInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: { left: false, right: false, up: false, down: false },
      shifts: [{ x: 0, y: 0 }],
      obstacles: [
        { x:  20, y:  30, shift: { x: 0, y: 0 } },
        { x: 100, y:  50, shift: { x: 0, y: 0 } },
        { x: -18, y:  30, shift: { x: 0, y: 0 } },
        { x: -50, y: -50, shift: { x: 0, y: 0 } },
      ],
      shiftsLimit: 10,
      obstaclesLimit: 1000,
      step: 3,
    }
    this.interval = null;
  }
  
  onArrowsChanged = (keys) => {
    this.setState({ keys });
    sendKeyInfo(keys);
  };

  onObstaclesChange = (event) => {

  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const {
        keys: { left, right, up, down },
        step, shifts, shiftsLimit,
      } = this.state;

      const lastShift = shifts[0];

      let x = lastShift.x, y = lastShift.y;
      
      y += up   ? -step : 0;
      y += down ?  step : 0;

      x += (up || down) && left  ? -step : 0;
      x += (up || down) && right ?  step : 0;

      const newShifts = [{x, y}, ...shifts.slice(0, shiftsLimit - 1)];
      this.setState({ shifts: newShifts });
    }, 100);
    startListeningForTheObstacles(this.onObstaclesChange);
  }

  render() {
    const {
      onArrowsChanged,
      state: { keys, shifts, obstacles },
    } = this;
    return (
      <Fragment>
        <Display centers={shifts} obstacles={obstacles} />
        <ArrowKeys keys={keys} onChange={onArrowsChanged} />
      </Fragment>
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    stopListeningForTheObstacles(this.onObstaclesChange);
  }
}
  

export default App;
