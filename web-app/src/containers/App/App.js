import React, { Component, Fragment } from 'react';
import ArrowKeys from '../ArrowKeys';
import Display from '../Display';

import { startListeningForTheObstacles, stopListeningForTheObstacles } from '../../api/obstacles';
import sendKeyInfo from '../../api/sendKeyInfo';
import getNewShift from './carLogic/getNewtShift';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: { left: false, right: false, up: false, down: false },
      shifts: [{ x: 0, y: 0, angle: 1.5707963 }],
      sensors: {
        leftMiddle: 300,
        leftFront: 240,
        front: 128,
        rightFront: 60,
        rightMiddle: 0,
      },
      shiftsLimit: 10,
      obstaclesLimit: 20,
      car: {
        maxSpeed: 6,
        speed: 1,
        currentSpeed: 0,
        angleSpeed: 3.14159265359 / 15,
        maxAngle: 3.14159265359 / 3, // 60^o
        currentAngle: 0,
        breakingFactor: 2,
      },
    }
    this.interval = null;
  }
  
  onArrowsChanged = (keys) => {
    this.setState({ keys });
    sendKeyInfo(keys);
  };

  onObstaclesChange = (sensors) => {
    console.log(sensors);
    this.setState({
      sensors,
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const {
        keys, shifts, shiftsLimit, car,
      } = this.state;

      const lastShift = shifts[0];
      const { x, y, currentSpeed, currentAngle } = getNewShift(lastShift, keys, car);

      const newShifts = [{x, y, angle: currentAngle }, ...shifts.slice(0, shiftsLimit - 1)];
      this.setState({ shifts: newShifts, car: { ...car, currentSpeed, currentAngle } });
    }, 100);
    startListeningForTheObstacles(this.onObstaclesChange);
  }

  render() {
    const {
      onArrowsChanged,
      state: { keys, shifts, sensors },
    } = this;
    return (
      <Fragment>
        <Display centers={shifts} sensors={sensors} />
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
