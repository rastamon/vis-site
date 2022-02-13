const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;


let particleArray;

// get mous position

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

//create particle

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(0,255,0, 0.5)";
        ctx.fill();
    }

    //check particle position, check mouse position, move the particle, draw the particle

    update() {
        // check if the particle is still within canvas

        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // check collision detection - mouse position / particle position 
        let dx = mouse.x - this.x;
        let dy = mouse.x - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        // if (distance < mouse.radius + this.size) {
        //     if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        //         this.x += 10;
        //     }
        //     if (mouse.x > this.x && this.x > this.size * 10) {
        //         this.x -= 10;
        //     }
        //     if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        //         this.y += 10;
        //     }
        //     if (mouse.y > this.y && this.y > this.size * 10) {
        //         this.y -= 10;
        //     }
        // }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        //draw particle
        this.draw();
    }
}

// create particle array

function init() {
    particleArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < 6; i++) {
        let size = Math.random() * 200;
        let x = Math.random() * ((innerWidth - size * 2) - (size * 4) + size * 4);
        let y = Math.random() * (innerHeight - size * 2 - (size * 4) + size * 4);
        let directionX = (Math.random() * .1) - .5;
        let directionY = (Math.random() * .1) - .5;
        let color = 'green';


        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// check if particles are close enough to draw line between them
/* function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
                + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.width / 7)) {
                opacityValue = 1 - (distance / 20000)
                ctx.strokeStyle = `rgba(140, 85, 31, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }

        }

    }
} */

//animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    // connect()
}

//resize event
window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80))
        init();
    }
)

// mouse out event

window.addEventListener('mouseout',
    function () {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)


init();
animate();

