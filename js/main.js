document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Basic Formspree AJAX submission (Optional - requires form-handler.js or integrate here)
    // You'll need to replace YOUR_FORMSPREE_ENDPOINT
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    contactForm.reset();
                    if (formStatus) formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    if (formStatus) formStatus.style.color = 'green';
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            if (formStatus) formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            if (formStatus) formStatus.textContent = "Oops! There was a problem submitting your form.";
                        }
                        if (formStatus) formStatus.style.color = 'red';
                    })
                }
            }).catch(error => {
                if (formStatus) formStatus.textContent = "Oops! There was a problem submitting your form.";
                if (formStatus) formStatus.style.color = 'red';
            });
        });
    }
});