let game;

setup = () => {
    initCanvas();
    game = new Game();
    frameRate(15);
}

draw = () => {
    background(220);
    game.update();
    game.draw();
}


changeFrameRate = (v) => {
    const currentFrameRate = Math.floor(frameRate());
    const newFrameRate = (currentFrameRate + v > 0 && currentFrameRate + v < 120) ? currentFrameRate + v : currentFrameRate;
    frameRate(newFrameRate);
}

initCanvas = () => {
    var canvasDiv = document.getElementById('p5canvas');
    var width = canvasDiv.offsetWidth;
    canvas = createCanvas(width,width);
    canvas.parent('p5canvas');
}