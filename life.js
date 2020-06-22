let field;
let size;
let run;
let showText;

/*
1. Cells with less then 2 neighbours die
2. Dead cell with 3 live neighbours become alive
3. Cells with more then 3 neighbours die
*/

setup = () => {
    createCanvas(800, 800);
    fieldWidth = 700;
    fieldHeight = 700;

    field = [];
    size = 50;
    run = false;


    for (let y = 0; y < size; y++) {
        field.push([])
        for (let x = 0; x < size; x++) {
            field[y].push(random([true,false]))
        }
    }
    frameRate(20)

    button = createButton('run');
    button.position(fieldWidth+50, 50);
    button.mousePressed(() => {
        run = !run
    });

    button = createButton('text');
    button.position(fieldWidth+50, 70);
    button.mousePressed(() => {
        showText = !showText
    });
}

draw = () => {
    background(220);
    drawField(field)
    const changes = updateField(field)
    if (run) {
        changes.map(c => {
            field[c.y][c.x] = c.change
        })
    }
}

test1 = () => {
    field[1][3] = true
    field[1][4] = true
    field[1][5] = true

    let x = numNeighbours(field, 4, 1)
    console.log(x)
}

numNeighbours = (f, x, y) => {
    let count = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {

            } else {
                if (f[y + i] && f[y + i][x + j]) {
                    // console.log(`${x}${y} has neighbour at y:${y + i} x:${x + j}`)
                    count += 1;
                }
            }
        }
    }
    return count
}

updateField = (f) => {
    const fW = fieldWidth / size
    const fH = fieldHeight / size

    let changes = []

    for (let y = 0; y < f.length; y++) {
        for (let x = 0; x < f[y].length; x++) {
            let nn = numNeighbours(f, x, y)
            stroke(255, 0, 0)
            if(showText){
                text(nn, fW / 2 + x * fW, fH / 2 + y * fH)
            }
                

            // const change = nn < 2 ? false : nn === 3 ? true : nn > 3 ? false : true
            let change;
            if (f[y][x]) { // alive
                if (nn < 2) {
                    change = false
                }
                if (nn > 3) {
                    change = false
                }
                if(nn === 2 || nn === 3){
                    change = true
                }
            } else { // dead 
                if (nn === 3) {
                    change = true
                }
            }

            changes.push({ x: x, y: y, change: change })
        }
    }
    return changes
}

drawField = (f) => {
    let w = fieldWidth / size
    let h = fieldHeight / size
    for (let y = 0; y < f.length; y++) {
        for (let x = 0; x < f[y].length; x++) {
            noStroke()
            if (field[y][x]) {
                fill(0)
            } else {
                fill(255)
            }

            rect(x + x * w, y + y * h, w, h)
        }
    }
}

mouseClicked = () => {
    if(mouseX < fieldWidth && mouseY < fieldHeight){
        const x = Math.floor(mouseX / (fieldWidth / size))
        const y = Math.floor(mouseY / (fieldHeight / size))
        field[y][x] = true
    }
}