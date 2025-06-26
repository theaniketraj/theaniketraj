document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.body.classList.add(currentTheme); // Add 'dark-mode' if stored
        if (currentTheme === 'dark-mode') {
            themeToggleButton.textContent = '🌙'; // Moon for dark mode
        } else {
            themeToggleButton.textContent = '☀️'; // Sun for light mode
        }
    } else {
        // Default to light mode if no preference stored, or check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            themeToggleButton.textContent = '🌙';
        } else {
            themeToggleButton.textContent = '☀️';
        }
    }


    themeToggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        let theme = 'light-mode'; // Default to light
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
            themeToggleButton.textContent = '🌙';
        } else {
            themeToggleButton.textContent = '☀️';
        }
        localStorage.setItem('theme', theme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? "dark-mode" : "light-mode";
        document.body.classList.remove("dark-mode", "light-mode"); // remove existing
        document.body.classList.add(newColorScheme);
        themeToggleButton.textContent = e.matches ? '🌙' : '☀️';
        localStorage.setItem('theme', newColorScheme);
    });
});