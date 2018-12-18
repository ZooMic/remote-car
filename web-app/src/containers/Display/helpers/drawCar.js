import car from './car.png';
const size = { width: 20, height: 40 };
const imgSize = { width: 96, height: 192 };
let imgElement = null;

const initImageElement = () => {
    let img = new Image(96, 192);
    img.onload = () => {
        imgElement = img;
    };
    img.src = car;
};

initImageElement();

const getColor = (value, max = 256) => {
    const middle = max / 2;
    const scale = 255 / middle;
    if (value < 0) {
        return '#FF000080';
    }

    if (value > max) {
        return '#00FF0080';
    }

    if (value <= middle) {
        let green = Math.floor(value * scale).toString(16);
        if (green.length < 2) {
            green = '0' + green;
        }
        return `#FF${green}0080`;
    } else {
        let red = Math.floor((middle - (value - middle))*scale).toString(16);
        if (red.length < 2) {
            red = '0' + red;
        }
        return `#${red}FF0080`;
    }
}

const drawSensors = (ctx, sensors) => {
    // LEFT MIDDLE
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-100, 60);
    ctx.lineTo(-100, -60);
    ctx.fillStyle = getColor(sensors.leftMiddle);
    ctx.fill();

    // LEFT FRONT
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-100, -60);
    ctx.lineTo(-20, -120);
    ctx.fillStyle = getColor(sensors.leftFront);
    ctx.fill();

    // FRONT
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-20, -120);
    ctx.lineTo(20, -120);
    ctx.fillStyle = getColor(sensors.front);
    ctx.fill();

    // RIGHT FRONT
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, -120);
    ctx.lineTo(100, -60);
    ctx.fillStyle = getColor(sensors.rightFront);
    ctx.fill();

    // RIGHT MIDDLE
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(100, -60);
    ctx.lineTo(100, 60);
    ctx.fillStyle = getColor(sensors.rightMiddle);;
    ctx.fill();
}

export default function drawCar(ctx, angle, sensors) {
    const x = ctx.canvas.width / 2;
    const y = ctx.canvas.height / 2;
    const { width: w, height: h } = size;

    if (!imgElement) {
        return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    drawSensors(ctx, sensors);
    ctx.drawImage(imgElement, 0, 0, imgSize.width, imgSize.height, -w / 2, -h / 2, w, h);
    ctx.restore();
}