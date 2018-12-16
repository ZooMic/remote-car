const defaults = {
    width: 5,
    height: 5,
    color: '#000000',
};

export default function drawRect(ctx, {x, y}, width = defaults.width, height = defaults.height, color = defaults.color ) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height); 
};