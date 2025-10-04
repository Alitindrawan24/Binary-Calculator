// Binary Calculator - Theme Management
// Handles theme switching and persistence

export class ThemeManager {
  constructor() {
    this.currentTheme = this.loadTheme();
    this.themeToggleBtn = null;
  }

  init() {
    this.themeToggleBtn = document.getElementById('themeToggle');
    this.setTheme(this.currentTheme);
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    this.updateThemeIcon(theme);
    this.saveTheme(theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  updateThemeIcon(theme) {
    if (!this.themeToggleBtn) return;

    // Update inline SVG icons
    const moonIcon = document.getElementById('iconMoon');
    const sunIcon = document.getElementById('iconSun');

    if (moonIcon && sunIcon) {
      if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
      } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
      }
    }
  }

  loadTheme() {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Default to dark
    return 'dark';
  }

  saveTheme(theme) {
    localStorage.setItem('calculator-theme', theme);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
