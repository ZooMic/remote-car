import React, { Component } from 'react';
import { canvas } from './Display.module.css';
import { drawPoint, drawCar } from './helpers';

class Display extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canvasSize: Math.floor(window.innerWidth * 0.8),
        }

        this.isFullscreen = false;
        this.canvasRef = null;
        this.ctx = null;
    }

    toggleFullScreen = () => {
        if (!this.isFullscreen) {
            const docEle = document.documentElement;
            const reqFullscreen = (docEle.webkitRequestFullScreen || docEle.requestFullscreen).bind(docEle);
            reqFullscreen();
            this.isFullscreen = true;
        } else {
            const exitFullscreen = (document.exitFullscreen || document.webkitExitFullscreen).bind(document);
            exitFullscreen();
            this.isFullscreen = false; 
        }
    }

    onRef = (node) => {
        if (node) {
            this.canvasRef = node;
            this.ctx = node.getContext('2d');
        }
    }

    drawCurrent = () => {
        const {
            ctx,
            props: { centers, sensors },
        } = this;
        const { width, height } = ctx.canvas;
        // console.log(sensors);
        ctx.clearRect(0, 0, width, height);

        const center = {
            x: Math.floor(ctx.canvas.width / 2),
            y: Math.floor(ctx.canvas.height / 2),
        };
        const lastCenter = centers[0];

        // DRAWING CAR
        const shifts = centers.map(({ x, y, angle }) => ({
            x: x - lastCenter.x,
            y: y - lastCenter.y,
            angle,
        }));


        shifts.forEach((s, i) => {
            drawPoint(ctx, {
                x: center.x + s.x,
                y: center.y + s.y,
            }, Math.pow((shifts.length - i) / shifts.length, 3));
        });
        drawCar(ctx, lastCenter.angle, sensors);
    }

    componentDidMount() {
        this.drawCurrent();
    }

    componentDidUpdate() {
        this.drawCurrent();
    }

    render() {
        const {
            toggleFullScreen, onRef,
            state: { canvasSize },
        } = this;
        return <canvas className={canvas} onClick={toggleFullScreen} ref={onRef} width={canvasSize} height={canvasSize} />
    }
}

export default Display;