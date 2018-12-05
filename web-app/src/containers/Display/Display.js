import React, { Component } from 'react';
import { canvas } from './Display.module.css';
import { drawPoint, drawRect } from './helpers';

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
            props: { centers, obstacles },
        } = this;
        const { width, height } = ctx.canvas;

        ctx.clearRect(0, 0, width, height);

        // DRAWING CAR

        const lastCenter = centers[0];
        const shifts = centers.map(({ x, y, angle }) => ({
            x: x - lastCenter.x,
            y: y - lastCenter.y,
            angle,
        }));

        const center = {
            x: Math.floor(ctx.canvas.width / 2),
            y: Math.floor(ctx.canvas.height / 2),
        };


        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(lastCenter.angle);
        ctx.fillStyle = "00FF00";
        ctx.fillRect(center.x - 10, center.y - 20, 20, 40);
        ctx.restore();

        shifts.forEach((s, i) => {
            drawPoint(ctx, {
                x: center.x + s.x,
                y: center.y + s.y,
            }, Math.pow((shifts.length - i) / shifts.length, 3));
        });

        drawPoint(ctx, {
            x: center.x,
            y: center.y,
        }, 1, '#000000', 4);

        // DRAWING OBSTACLES
        obstacles.forEach((o) => {
            const x = center.x + o.x + (o.shift.x - lastCenter.x);
            const y = center.x + o.y + (o.shift.y - lastCenter.y);
            drawRect(ctx, {x, y});
        });
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