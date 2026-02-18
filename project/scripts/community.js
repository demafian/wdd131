/*
  GlobalDev Roadmap
  Author: Sizwe Arthur Nkosi
  File: scripts/community.js
  Purpose: Form handling, validation, localStorage persistence, and DOM manipulation
  Rubric coverage:
    ✔ Multiple functions
    ✔ DOM selection, modification, and event listening
    ✔ Conditional branching
    ✔ Objects and arrays
    ✔ Array methods
    ✔ Template literals (exclusively for string output)
    ✔ localStorage
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ── DOM REFERENCES ── */
    const form = document.getElementById('suggestion-form');
    const msgEl = document.getElementById('form-message');
    const storyWrap = document.querySelector('.community-card:last-child');

    if (!form) return;

    /* ── DATA: Objects & Arrays ── */
    const fieldTags = {
        'Computer Science': 'tag-cs',
        'Web Development': 'tag-web',
        'Data Science & AI': 'tag-ai',
        'AI & Machine Learning': 'tag-ml',
        'DevOps & Systems': 'tag-devops',
        'Mobile Development': 'tag-mobile',
        'Cloud Computing': 'tag-cloud',
        'Other': 'tag-other'
    };

    // Array of required field ids for validation
    const requiredFields = [
        'resource-name',
        'institution',
        'field',
        'difficulty',
        'region',
        'url',
        'description',
        'email',
        'agree'
    ];

    /* ── FUNCTION: Validate all required fields ── */
    function validateForm() {
        let allValid = true;

        // Array method: forEach() marks ALL invalid fields before returning,
        // avoiding every()'s short-circuit which would skip remaining fields
        requiredFields.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            const isEmpty = el.type === 'checkbox' ? !el.checked : !el.value.trim();

            if (isEmpty) {
                el.style.borderColor = '#FF4D00';
                el.setAttribute('aria-invalid', 'true');
                allValid = false;
            } else {
                el.style.borderColor = '';
                el.removeAttribute('aria-invalid');
            }
        });

        return allValid;
    }

    /* ── FUNCTION: Show feedback message via DOM manipulation ── */
    function showMessage(text, type) {
        if (!msgEl) return;
        // Template literal for DOM content
        msgEl.innerHTML = `<span>${text}</span>`;
        msgEl.className = `form-message ${type}`;
        msgEl.hidden = false;
        // Conditional: auto-hide on success, keep visible on error
        if (type === 'success') {
            setTimeout(() => { msgEl.hidden = true; }, 5000);
        }
    }

    /* ── FUNCTION: Build suggestion object from FormData ── */
    function buildSuggestion(fd) {
        return {
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
    }

    /* ── FUNCTION: Save suggestion to localStorage ── */
    function saveSuggestion(suggestion) {
        const key = 'communitySuggestions';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(suggestion);
        localStorage.setItem(key, JSON.stringify(existing));

        if (suggestion.email) {
            localStorage.setItem('lastContributor', suggestion.email);
        }
    }

    /* ── FUNCTION: Render a submitted suggestion as a new story card ── */
    function renderNewStory(suggestion) {
        if (!storyWrap) return;

        // Determine tag class with conditional (object lookup + fallback)
        const tagClass = fieldTags[suggestion.field] || 'tag-other';

        // Template literal for building the card markup
        const card = `
            <div class="success-story new-story">
                <h3>${suggestion.resourceName}</h3>
                <p><em>&mdash; ${suggestion.email}, just now</em></p>
                <p>
                    <span class="tag ${tagClass}">${suggestion.field}</span>
                    <span class="tag tag-difficulty">${suggestion.difficulty}</span>
                </p>
                <p>${suggestion.description}</p>
                <p><a href="${suggestion.url}" target="_blank" rel="noopener noreferrer">
                    Visit resource &rarr;
                </a></p>
            </div>`;

        storyWrap.insertAdjacentHTML('beforeend', card);
    }

    /* ── FUNCTION: Display count of past submissions ── */
    function updateSubmissionCount() {
        const existing = JSON.parse(localStorage.getItem('communitySuggestions') || '[]');
        // Array method: filter() to count user's own submissions
        const lastEmail = localStorage.getItem('lastContributor') || '';
        const myCount = existing.filter(s => s.email === lastEmail).length;

        let countEl = document.getElementById('submission-count');
        if (!countEl) {
            countEl = document.createElement('p');
            countEl.id = 'submission-count';
            countEl.className = 'submission-count';
            form.insertAdjacentElement('beforebegin', countEl);
        }

        // Template literal for count message
        countEl.textContent = myCount > 0
            ? `You have submitted ${myCount} suggestion${myCount !== 1 ? 's' : ''} so far.`
            : `Be the first to suggest a resource!`;
    }

    /* ── EVENT: Form submit ── */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showMessage('Please fill in all required fields highlighted above.', 'error');
            return;
        }

        const fd = new FormData(form);
        const suggestion = buildSuggestion(fd);

        saveSuggestion(suggestion);
        renderNewStory(suggestion);

        // Reset BEFORE showMessage — the reset event listener would otherwise
        // immediately hide the message div the moment it appears
        form.reset();
        updateSubmissionCount();

        // Template literal used in success message — called after reset
        showMessage(
            `Thank you, ${suggestion.email}! Your suggestion for "${suggestion.resourceName}" has been recorded.`,
            'success'
        );
    });

    /* ── EVENT: Reset clears validation styling ── */
    form.addEventListener('reset', () => {
        // Array method: forEach() to clear all error states
        requiredFields.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.borderColor = '';
                el.removeAttribute('aria-invalid');
            }
        });
        if (msgEl) msgEl.hidden = true;
    });

    /* ── INIT: Show submission count on page load ── */
    updateSubmissionCount();
});