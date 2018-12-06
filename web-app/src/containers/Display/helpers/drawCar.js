import car from './car.png';
const size = { width: 20, height: 40 };
const imgSize = { width: 96, height: 192 };
let imgElement = null;

const initImageElement = () => {
    let img = new Image(96, 192);
    img.onload = () => {
        console.log("NOBS");
        imgElement = img;
    };
    img.src = car;
};

initImageElement();

export default function drawCar(ctx, angle) {
    const x = ctx.canvas.width / 2;
    const y = ctx.canvas.height / 2;
    const { width: w, height: h } = size;

    if (!imgElement) {
        return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(imgElement, 0, 0, imgSize.width, imgSize.height, x, 0, w, h);
    ctx.restore();
}