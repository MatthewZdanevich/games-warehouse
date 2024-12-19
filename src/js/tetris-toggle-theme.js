const root = document.documentElement;
const toggleThemeButton = document.querySelector(".toggle-theme-button");

toggleThemeButton.addEventListener('click', () => {
    if (root.style.getPropertyValue('--background-color') === '#222831') {
        root.style.setProperty('--background-color', '#F9F5F6');
        root.style.setProperty('--fill-color', '#F8E8EE');
        root.style.setProperty('--font-color', '#062C30');
        root.style.setProperty('--description-color', '#05595B');
    } else {
        root.style.setProperty('--background-color', '#222831');
        root.style.setProperty('--fill-color', '#31363F');
        root.style.setProperty('--font-color', '#EEEEEE');
        root.style.setProperty('--description-color', '#76ABAE');
    }
});
