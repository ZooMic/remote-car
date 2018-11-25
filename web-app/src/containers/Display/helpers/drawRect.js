const defaults = {
    width: 20,
    height: 20,
    color: '#000000',
};

export default function drawRect(ctx, {x, y}, width = defaults.width, height = defaults.height, color = defaults.color ) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height); 
};