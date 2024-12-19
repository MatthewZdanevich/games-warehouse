const root = document.documentElement;
const toggleThemeButton = document.querySelector(".toggle-theme-button");

toggleThemeButton.addEventListener('click', () => {
    if (root.style.getPropertyValue('--background-color') === '#222831') {
        root.style.setProperty('--background-color', '#F9F5F6');
        root.style.setProperty('--fill-color', '#F8E8EE');
        root.style.setProperty('--font-color', '#062C30');
        root.style.setProperty('--description-color', '#05595B');
        root.style.setProperty('--disabled-fill-color', '#E4D8DC');
        root.style.setProperty('--disabled-font-color', '#93B5C6');
    } else {
        root.style.setProperty('--background-color', '#222831');
        root.style.setProperty('--fill-color', '#31363F');
        root.style.setProperty('--font-color', '#EEEEEE');
        root.style.setProperty('--description-color', '#76ABAE');
        root.style.setProperty('--disabled-fill-color', '#331D2C');
        root.style.setProperty('--disabled-font-color', '#3F2E3E');
    }
});