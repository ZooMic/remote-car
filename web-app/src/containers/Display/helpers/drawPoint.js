const defaults = {
    radius: 10,
    pointColor: '#e18d03',
    pathFillColor: '#d4b787',
};

export default function drawPoint(ctx, { x, y }, colorPerc = 1, color = defaults.pointColor, radius = defaults.radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    const alfa = (255 * colorPerc).toString(16).slice(0,2);
    ctx.fillStyle = `${color}${alfa}`;
    ctx.fill();
}