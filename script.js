let game;

setup = () => {
    const width = initCanvas();
    game = new Game(width);
    frameRate(15);
}

draw = () => {
    background(220);
    game.update();
    game.draw();
}


changeFrameRate = (v) => {
    const currentFrameRate = Math.floor(frameRate());
    const newFrameRate = (currentFrameRate + v > 0 && currentFrameRate + v < 60) ? currentFrameRate + v : currentFrameRate;
    frameRate(newFrameRate);
}

initCanvas = () => {
    var canvasDiv = document.getElementById('p5canvas');
    var width = canvasDiv.offsetWidth;
    canvasW = width;
    canvasH = width;
    canvas = createCanvas(canvasW, canvasH);
    canvas.parent('p5canvas');
    return canvasW;
}