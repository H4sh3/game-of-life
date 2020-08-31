class Game {
    constructor(width) {
        this.width = width;
        this.size = 50;
        this.running = true;
        this.reset();
    }

    update() {
        const changes = this.calculateChanges();
        if (this.running) {
            changes.map(c => {
                this.field[c.y][c.x] = c.change;
            })
        }
    }

    run(){
        this.running = !this.running;
    }

    reset() {
        this.field = [];
        for (let y = 0; y < this.size - 3; y++) {
            this.field.push([]);
            for (let x = 0; x < this.size - 3; x++) {
                this.field[y].push(random([true, false]));
            }
        }
    }

    draw = () => {
        let w = this.width / this.size;
        let h = this.width / this.size;

        stroke(0);
        strokeWeight(0.1);

        for (let y = 1; y < this.field.length - 1; y++) {
            for (let x = 1; x < this.field[y].length - 1; x++) {
                if (this.field[y][x]) {
                    fill(0);
                } else {
                    fill(255);
                }
                rect(x + x * w, y + y * h, w, h);
            }
        }
    }

    calculateChanges = () => {
        let changes = [];
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                let nn = this.numNeighbours(this.field, x, y)
                stroke(255, 0, 0);
                let change;
                if (this.field[y][x]) { // alive
                    if (nn < 2) {
                        change = false;
                    }
                    if (nn > 3) {
                        change = false;
                    }
                    if (nn === 2 || nn === 3) {
                        change = true;
                    }
                } else { // dead 
                    if (nn === 3) {
                        change = true;
                    }
                }
                changes.push({ x: x, y: y, change: change });
            }
        }
        return changes;
    }
    
    numNeighbours = (f, x, y) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue;
                }
    
                if (f[y + i] && f[y + i][x + j]) {
                    count += 1;
                }
            }
        }
        return count;
    }
}

