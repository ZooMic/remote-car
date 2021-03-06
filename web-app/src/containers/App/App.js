import React, { Component, Fragment } from 'react';
import ArrowKeys from '../ArrowKeys';
import Display from '../Display';
import Loading from '../Loading';

import { startListeningForTheObstacles, stopListeningForTheObstacles } from '../../api/obstacles';
import sendKeyInfo from '../../api/sendKeyInfo';
import getNewShift from './carLogic/getNewtShift';
import socket from '../../api/web-socket';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: { left: false, right: false, up: false, down: false },
      shifts: [{ x: 0, y: 0, angle: 0 }],
      sensors: {
        leftMiddle: 256,
        leftFront: 256,
        front: 256,
        rightFront: 256,
        rightMiddle: 256,
      },
      shiftsLimit: 10,
      car: {
        maxSpeed: 6,
        speed: 1,
        currentSpeed: 0,
        angleSpeed: 3.14159265359 / 15,
        currentAngle: 0,
        breakingFactor: 2,
      },
      isConnected: false,
    }
    this.interval = null;
  }
  
  onArrowsChanged = (keys) => {
    this.setState({ keys });
    sendKeyInfo(keys);
  };

  onObstaclesChange = (sensors) => {
    this.setState({
      sensors,
    });
  }

  componentDidMount() {
    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });
    socket.on('disconnect', () => {
      this.setState({ isConnected: false });
    });
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
      state: { keys, shifts, sensors, isConnected },
    } = this;
    return (
      <Fragment>
        <Display centers={shifts} sensors={sensors} />
        <ArrowKeys keys={keys} onChange={onArrowsChanged} />
        <Loading isVisible={!isConnected} />
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
