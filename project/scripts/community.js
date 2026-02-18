/*
  GlobalDev Roadmap
  Author: Sizwe Arthur Nkosi
  Purpose: Client-side form handling, validation, and localStorage persistence
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('suggestion-form');
    const message = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm(form)) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        const fd = new FormData(form);
        const suggestion = {
            resourceName: fd.get('resourceName'),
            institution: fd.get('institution'),
            field: fd.get('field'),
            difficulty: fd.get('difficulty'),
            region: fd.get('region'),
            url: fd.get('url'),
            description: fd.get('description'),
            email: fd.get('email'),
            submittedDate: new Date().toISOString()
        };

        // Save locally
        const key = 'communitySuggestions';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(suggestion);
        localStorage.setItem(key, JSON.stringify(existing));

        if (suggestion.email) {
            localStorage.setItem('lastContributor', suggestion.email);
        }

        showMessage(
            `Thank you for your suggestion! We've recorded it${suggestion.email ? ` under ${suggestion.email}` : ''}.`,
            'success'
        );

        form.reset();
    });

    function validateForm(formEl) {
        const required = formEl.querySelectorAll('[required]');
        let ok = true;
        required.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#FF4D00';
                ok = false;
            } else {
                field.style.borderColor = '';
            }
        });
        return ok;
    }

    function showMessage(text, type) {
        if (!message) return;
        message.textContent = text;
        message.className = `form-message ${type}`;
        message.hidden = false;
        setTimeout(() => { message.hidden = true; }, 5000);
    }
});