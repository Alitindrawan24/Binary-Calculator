// themeSwitcheroo
function switchTheme(theme) {
  // Logic to switch themes
  const currentTheme = document.documentElement.getAttribute("class");
  if (currentTheme !== theme) {
    document.documentElement.setAttribute("class", theme);
  }
}

// Ensure the function is called after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  switchTheme("theme1"); // Apply theme1
  // You can add event listeners for buttons here to switch themes
  const themeButton1 = document.getElementById("theme-button-1");
  const themeButton2 = document.getElementById("theme-button-2");

  if (themeButton1) {
    themeButton1.onclick = () => switchTheme("root");
  }
  if (themeButton2) {
    themeButton2.onclick = () => switchTheme("theme1");
  }

  // Add a default theme switch if no button is clicked
  const defaultTheme = "theme1"; // Set your default theme here
  switchTheme(defaultTheme); // Ensure the default theme is applied
});
