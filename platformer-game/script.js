const startBtn = document.getElementById('start-btn');
const canvas = document.getElementById('canvas');

const startScreen = document.querySelector('.start-screen');
const checkpointScreen = document.querySelector('.checkpoint-screen');

// Use document.querySelector and the child combinator > to target the paragraph element.
const checkpointMessage = document.querySelector('.checkpoint-screen > p');

// The Canvas API can be used to create graphics in games using JavaScript and the HTML canvas element.
// You will need to use the getContext method which will provide the context for where the graphics will be rendered.
const ctx = canvas.getContext('2d');

// The canvas element has a width property which is a positive number that represents the width of the canvas.
// assign window innerwidth to the canvas width
canvas.width = innerWidth;

canvas.height = innerHeight;

const gravity = 0.5;

let isCheckpointCollisionDetectionActive = true;

const proportionalSize = size => {
    return innerHeight < 500
    ? Math.ceil((size / 500) * innerHeight)
    : size;
};

class Player {
    constructor() {
        this.position = {
            x: proportionalSize(10),
            y: proportionalSize(400),
        };

        this.velocity = {
            x: 0,
            y: 0,
        };

        this.width = proportionalSize(40);
        this.height = proportionalSize(40);
    }

    draw() {
        ctx.fillStyle = '#99c9ff';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            if (this.position.y < 0) {
                this.position.y = 0;
                this.velocity.y = gravity;
            }

            this.velocity.y += gravity;
        }
        else {
            this.velocity.y = 0;
        }

        if (this.position.x < this.width) {
            this.position.x = this.width;
        }

        if (this.position.x >= canvas.width - 2 * this.width) {
            this.position.x = canvas.width - 2 * this.width;
        }
    }
}

const player = new Player();

const animate = () => {
    // The requestAnimationFrame() web API, takes in a callback and is used to update the animation on the screen.
    // The animate function will be responsible for updating the player's position and continually drawing it on the canvas.
    requestAnimationFrame(animate);

    // You can use the clearRect() Web API to accomplish this. It takes in an x, y, width, and height arguments.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
}

const keys = {
    rightKey: {pressed: false},
    leftKey: {pressed: false},
}

const startGame = () => {
    canvas.style.display = 'block';
    startScreen.style.display = 'none';

    player.draw();
}

startBtn.addEventListener('click', startGame);