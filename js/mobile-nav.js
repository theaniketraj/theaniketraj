document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.main-nav .nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);

            // Optional: Change hamburger to X
            if (hamburger) {
                if (isExpanded) {
                    // Transform to X (simple version)
                    // You might need more complex CSS for a smooth animation
                    hamburger.style.transform = 'rotate(45deg)'; // This is a very basic X
                    // You'd typically have multiple spans in .hamburger and style them
                } else {
                    hamburger.style.transform = 'none';
                }
            }
        });

        // Close mobile nav when a link is clicked (optional)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    if (hamburger) hamburger.style.transform = 'none';
                }
            });
        });
    }
});