
const banner = document.querySelector(".banner");
window.onload = function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = banner.clientWidth;
    ctx.canvas.height = banner.clientHeight;



    let particleArray;
    const corona = document.getElementById('pill');
    const body = document.querySelector("body");

    // create contructor function

    //ctx.drawImage(corona, 10, 10, 100, 100);

    function Particle(x, y, directionX, directionY, size, image, filter) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.image = image;
        this.filter = filter;
    }

    // add draw method to particle prototype 

    Particle.prototype.draw = function () {
        ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        ctx.filter = this.filter;

    }
    // const particle1 = new Particle(100, 100, 1, 100, 200, corona);

    // particle1.draw();

    // Add update method to particle prototype

    Particle.prototype.update = function () {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();

    }

    // create particle array

    function init() {
        particleArray = [];
        for (let i = 0; i < 35; i++) {
            let size = Math.random() * 82;
            let x = Math.random() * (innerWidth - size * 2);
            let y = Math.random() * (innerHeight - size * 2);
            let directionX = (Math.random() * 5) - .2;
            let directionY = (Math.random() * 5) - .2;
            let filter = `blur(${Math.random() * 2}px)`
            //ctx.globalAlpha = Math.random() + 0.5;

            particleArray.push(new Particle(x, y, directionX, directionY, size, corona, filter));
        }
    }

    //animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }

    init();
    animate();

    window.addEventListener('resize',
        function () {
            canvas.width = banner.clientWidth;
            canvas.height = banner.clientHeight;
            init();
        }
    )
}







