const schoolButton = document.querySelector("#school");
const musicButton = document.querySelector("#music");
const buttons = document.querySelectorAll(".event-button");

const sections = document.querySelectorAll(".event-section");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {

        const selectedSection = document.querySelector(`.${button.id}-section`);
        sections.forEach(section => {
            section.classList.add("disappear");

        });
        selectedSection.classList.remove("disappear");
        console.log(selectedSection);
    })
});

