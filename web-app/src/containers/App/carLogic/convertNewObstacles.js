import { PI, calibration, carRadius } from './statics';

export default function convertNewObstacles (shift, obstacles) {
    return obstacles.map(obstacle => {
        const { angle, length } = obstacle;
        const rad = angle * PI / 180 + calibration;
        const radius = length + carRadius;
        const x = Math.sin(rad) * radius;
        const y = Math.cos(rad) * radius;
        return { shift, x, y };
    });
}