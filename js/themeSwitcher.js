// themeSwitcheroo
function switchTheme() {
  const currentTheme = document.documentElement.getAttribute("class");

  // Check which theme is currently applied and toggle
  if (currentTheme === "theme1") {
    document.documentElement.setAttribute("class", "theme2");  // Switch to dark theme
    document.getElementById("theme-icon").src = "images/moon.png";  // Update icon to sun
  } else {
    document.documentElement.setAttribute("class", "theme1");  // Switch to light theme
    document.getElementById("theme-icon").src = "images/moon.png"; // Update icon to moon
  }
}

// Ensure the function is called after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set default theme
  const defaultTheme = "theme1";  // Light theme as default
  document.documentElement.setAttribute("class", defaultTheme);  // Apply default theme

  // Attach event listener to the theme toggle button
  const themeToggleButton = document.getElementById("toggle-theme-button");
  if (themeToggleButton) {
    themeToggleButton.onclick = switchTheme;  // Toggle theme on button click
  }
});
