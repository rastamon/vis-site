const themeToggle = document.querySelector('#theme-toggle');
let theme = localStorage.getItem('theme');

themeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem("darkMode")
    document.body.classList.contains("light-theme") ?
        enableDarkMode()
        : enableLightMode();
})

function enableDarkMode() {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");

    localStorage.setItem('theme', 'dark-theme');
    themeToggle.setAttribute("aria-label", "Switch to light theme");
}

function enableLightMode() {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");

    localStorage.setItem('theme', "light-theme");
    themeToggle.setAttribute("aria-label", "Switch to dark theme");

}

function setThemePreference() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
        return;
    }

    enableLightMode();
}

document.onload = setThemePreference();

if (theme === "light-theme") {
    enableLightMode();
} else if (theme === "dark-theme") {
    enableDarkMode();
}