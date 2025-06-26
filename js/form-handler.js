// js/form-handler.js
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status'); // The <p> tag to show messages

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission (page reload)

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            if (formStatus) formStatus.textContent = ''; // Clear previous status

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Important for Formspree to send JSON response
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Successful submission
                        contactForm.reset(); // Clear the form fields
                        if (formStatus) {
                            formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                            formStatus.style.color = 'green'; // Or a success class
                        }
                    } else {
                        // Handle errors (e.g., server error, validation error from Formspree)
                        response.json().then(data => {
                            if (formStatus) {
                                if (data && data.errors) {
                                    formStatus.textContent = data.errors.map(error => error.message).join(", ");
                                } else {
                                    formStatus.textContent = "Oops! There was a problem submitting your form. Please try again.";
                                }
                                formStatus.style.color = 'red'; // Or an error class
                            }
                        }).catch(() => {
                            // Fallback error if response is not JSON
                            if (formStatus) {
                                formStatus.textContent = "Oops! An unexpected error occurred. Please try again.";
                                formStatus.style.color = 'red';
                            }
                        });
                    }
                })
                .catch(error => {
                    // Network error or other issues
                    if (formStatus) {
                        formStatus.textContent = "Network error. Please check your connection and try again.";
                        formStatus.style.color = 'red';
                    }
                    console.error('Form submission error:', error);
                })
                .finally(() => {
                    // Re-enable button and restore original text
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });
        });
    }
});