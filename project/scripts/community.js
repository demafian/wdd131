// Community form handling
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('suggestion-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const suggestion = {
                resourceName: formData.get('resourceName'),
                institution: formData.get('institution'),
                field: formData.get('field'),
                difficulty: formData.get('difficulty'),
                region: formData.get('region'),
                url: formData.get('url'),
                description: formData.get('description'),
                email: formData.get('email'),
                submittedDate: new Date().toISOString()
            };


            // In a real application, this would send to a server
            // For now, we'll save it to localStorage as a demonstration
            saveSuggestion(suggestion);

            // Save contributor identifier for later display
            if (suggestion.email) {
                localStorage.setItem('lastContributor', suggestion.email);
            }

            // Show personalized success message
            showMessage(`Thank you for your suggestion! We've recorded it under: ${suggestion.email || 'your email'}.`, 'success');

            // Reset form
            form.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});

function saveSuggestion(suggestion) {
    // Get existing suggestions from localStorage
    let suggestions = JSON.parse(localStorage.getItem('communitySuggestions')) || [];

    // Add new suggestion
    suggestions.push(suggestion);

    // Save back to localStorage
    localStorage.setItem('communitySuggestions', JSON.stringify(suggestions));

    // In a production app, you would send this to a server:
    // fetch('/api/suggestions', { 
    //     method: 'POST', 
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(suggestion)
    // })
}

function showMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// Validate form inputs
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#FF4D00';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });

    return isValid;
}
