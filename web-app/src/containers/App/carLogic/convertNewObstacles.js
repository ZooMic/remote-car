import { PI, calibration, carRadius } from './statics';

export default function convertNewObstacles (shift, obstacles) {
    return obstacles.map(obstacle => {
        const { angle, distance } = obstacle;

        const rad = angle * PI / 180 + calibration;
        const radius = distance + carRadius;
        const x = Math.floor(Math.sin(rad) * radius / 50);
        const y = Math.floor(Math.cos(rad) * radius / 50);
        return { shift, x, y };
    });
}