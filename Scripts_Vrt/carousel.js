const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

//Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Circle indicators
const dots = document.querySelectorAll('.dot');
const dotContainer = document.querySelector('.dot-container');
const dotArray = [];
dots.forEach(element => {
    dotArray.push(element);
});


//Counter
let counter = 1;
let slideIndex = 0;
let size = carouselImages[0].clientWidth;

window.addEventListener('resize',
    function () {
        size = carouselImages[0].clientWidth;

    }
)

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

//Button Listeners

let autoSlide = setInterval(moveSlides, 4000);

function moveSlides() {
    carouselSlide.style.transition = "1s ease-in-out";
    carouselSlide.style.transform = 'translateX(' + (-size * (counter + 1)) + 'px)';
    counter++
    console.log(counter);
    if (counter >= 5) {
        counter = 1;
    }

}

nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    console.log(counter);
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    let i;
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" fill", "")
    }

    dots[counter - 1].className += " fill";
});

dotContainer.addEventListener('click', (e) => {
    const dotTarget = e.target;

    if (!dotTarget.classList.contains('fill')) {
        dotTarget.classList.add("fill");
    }

    dotArray.forEach(element => {
        if (element != dotTarget) {
            element.classList.remove("fill");
        }
    })

    counter = dotArray.indexOf(dotTarget) + 1;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

})

