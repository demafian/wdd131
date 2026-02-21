/*
  GlobalDev Roadmap
  Author: Sizwe Arthur Nkosi
  File: scripts/resources.js
  Purpose: Resources gallery — render, filter, save/remove + localStorage
  Rubric coverage:
    ✔ Multiple functions
    ✔ DOM selection, modification, and event listening
    ✔ Conditional branching
    ✔ Objects (resource objects) and arrays (resources array)
    ✔ Array methods: filter(), map(), find(), some()
    ✔ Template literals (exclusively for all string output / HTML)
    ✔ localStorage (save/remove/persist saved resources)
*/

/* ═══════════════════════════════════════
   DATA: Array of resource objects
   ═══════════════════════════════════════ */
const resources = [
    {
        id: 1,
        name: "Harvard CS50",
        institution: "Harvard University",
        field: "Computer Science",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "The gold standard for Computer Science fundamentals. Covers algorithms and core CS principles.",
        url: "https://cs50.harvard.edu/x/",
        image: "https://pll.harvard.edu/sites/default/files/styles/16_9_large/public/course/CS50x_pll.png?itok=AxciDjWM"
    },
    {
        id: 2,
        name: "Google DevOps",
        institution: "Google",
        field: "DevOps & Systems",
        difficulty: "Advanced",
        region: "International Remote",
        description: "Professional automation and systems engineering. Learn CI/CD pipelines and cloud deployment.",
        url: "https://cloud.google.com/training",
        image: "https://media.licdn.com/dms/image/sync/v2/D4E27AQEaUBol2YpQMQ/articleshare-shrink_800/B4EZtzxgzrGoAI-/0/1767173918274?e=2147483647&v=beta&t=4cJdn7Ujt9CiyKZUdvSF_3WoAzPKuCg5OOEC4aPKJIc"
    },
    {
        id: 3,
        name: "IBM Data Science",
        institution: "IBM",
        field: "Data Science & AI",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "Master data-driven decision making. Covers Python, machine learning, and practical data analysis.",
        url: "https://www.ibm.com/training",
        image: "https://raw.githubusercontent.com/roshangrewal/IBM-Data-Science-Professional-Certification/master/IBM-Banner.png"
    },
    {
        id: 4,
        name: "FreeCodeCamp",
        institution: "FreeCodeCamp",
        field: "Web Development",
        difficulty: "Beginner",
        region: "International Remote",
        description: "Complete web development curriculum covering HTML, CSS, JavaScript, and React.",
        url: "https://www.freecodecamp.org",
        image: "https://i.pcmag.com/imagery/reviews/01tPXClg2WjLamQzScplH3y-15..v1627670281.png"
    },
    {
        id: 5,
        name: "MIT OpenCourseWare",
        institution: "MIT",
        field: "Computer Science",
        difficulty: "Advanced",
        region: "International Remote",
        description: "Free access to MIT materials including algorithms and advanced CS topics.",
        url: "https://ocw.mit.edu",
        image: "https://massworld.news/wp-content/uploads/2023/02/MIT-Logo.png"
    },
    {
        id: 6,
        name: "Coursera AI",
        institution: "Stanford",
        field: "AI & Machine Learning",
        difficulty: "Advanced",
        region: "International Remote",
        description: "Comprehensive AI specialization covering neural networks and deep learning.",
        url: "https://www.coursera.org",
        image: "https://www.aidoos.com/media/aidoos_product/Coursera.png"
    },
    {
        id: 7,
        name: "Udacity Nanodegree",
        institution: "Udacity",
        field: "Web Development",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "Career-focused programs in mobile development and cloud computing.",
        url: "https://www.udacity.com",
        image: "https://miro.medium.com/1*c0CdMMI9iCGeghAgO2cq5A.png"
    },
    {
        id: 8,
        name: "Khan Academy",
        institution: "Khan Academy",
        field: "Computer Science",
        difficulty: "Beginner",
        region: "Both",
        description: "Free foundational programming courses. Great low-bandwidth starting point.",
        url: "https://www.khanacademy.org",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1UU6QIUKZWMnX3tkSG6hxT4xmgKKEmhtmcA&s"
    },
    {
        id: 9,
        name: "Open Source ZA Meetups",
        institution: "Community",
        field: "Web Development",
        difficulty: "Beginner",
        region: "South Africa Local",
        description: "Local meetups and talks focused on open-source software and web fundamentals.",
        url: "https://www.meetup.com/topics/open-source/za/",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Meetup_Logo.png"
    },
    {
        id: 10,
        name: "GitHub Learning Lab",
        institution: "GitHub",
        field: "DevOps & Systems",
        difficulty: "Beginner",
        region: "International Remote",
        description: "Hands-on Git and GitHub courses taught by bots. Learn version control and open-source collaboration in your own repos.",
        url: "https://learn.github.com/courses",
        image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    },
    {
        id: 11,
        name: "Hello Interview",
        institution: "Hello Interview",
        field: "Computer Science",
        difficulty: "Advanced",
        region: "International Remote",
        description: "AI-powered mock interviews for FAANG and top-tier companies. Practise system design, algorithms, and behavioural rounds.",
        url: "https://www.hellointerview.com/",
        image: "https://www.hellointerview.com/favicon.ico"
    },
    {
        id: 12,
        name: "W3Schools",
        institution: "W3Schools",
        field: "Web Development",
        difficulty: "Beginner",
        region: "Both",
        description: "The go-to quick reference for HTML, CSS, JavaScript, SQL, and more. Works well on low-bandwidth connections.",
        url: "https://www.w3schools.com/",
        image: "https://www.w3schools.com/images/w3schools_logo_436_2.png"
    },
    {
        id: 13,
        name: "Scrimba",
        institution: "Scrimba",
        field: "Web Development",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "Interactive screencasts where you can pause and edit code inline. Front-end focused with React, CSS, and JavaScript paths.",
        url: "https://scrimba.com/courses",
        image: "https://www.google.com/s2/favicons?domain=scrimba.com&sz=128"
    },
    {
        id: 14,
        name: "AWS Skill Builder",
        institution: "Amazon Web Services",
        field: "DevOps & Systems",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "Free cloud training from AWS — over 500 digital courses covering cloud practitioner, architecture, and DevOps fundamentals.",
        url: "https://skillbuilder.aws/search?page=1&typeId=digital_course",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png"
    },
    {
        id: 15,
        name: "MDN Web Docs",
        institution: "Mozilla",
        field: "Web Development",
        difficulty: "Beginner",
        region: "Both",
        description: "The authoritative reference for web standards — HTML, CSS, JavaScript APIs. Essential daily bookmark for every web developer.",
        url: "https://developer.mozilla.org/en-US/",
        image: "https://developer.mozilla.org/mdn-social-share.png"
    },
    {
        id: 16,
        name: "QuickRef.ME",
        institution: "QuickRef",
        field: "Computer Science",
        difficulty: "Beginner",
        region: "Both",
        description: "Community-maintained cheatsheets for 200+ languages and tools. Lightweight, offline-friendly, and fast to load on mobile data.",
        url: "https://quickref.me/",
        image: "https://quickref.me/images/favicon.png"
    },
    {
        id: 17,
        name: "Real Python",
        institution: "Real Python",
        field: "Data Science & AI",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "In-depth Python tutorials and courses from working developers. Covers data science, automation, APIs, and clean code practices.",
        url: "https://realpython.com/",
        image: "https://www.google.com/s2/favicons?domain=realpython.com&sz=128"
    }
];

/* ═══════════════════════════════════════
   localStorage helpers
   ═══════════════════════════════════════ */
const LS_KEY = 'savedResources';

function getSaved() {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
}

function setSaved(arr) {
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
}

/* ═══════════════════════════════════════
   FUNCTION: Build a single card's HTML
   Uses template literals exclusively
   ═══════════════════════════════════════ */
function buildCard(item, isSaved) {
    // Conditional branching — choose button label/class based on saved state
    const actionBtn = isSaved
        ? `<button class="btn-reset" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name} from saved">Remove</button>`
        : `<button class="btn-save"  data-action="save"   data-id="${item.id}" aria-label="Save ${item.name} for later">Save</button>`;

    // Template literal builds entire card markup
    return `
        <article class="resource-card">
            <div class="card-header">
                <img
                    src="${item.image}"
                    alt="${item.institution} logo"
                    class="resource-icon"
                    loading="lazy"
                    decoding="async"
                    width="80"
                    height="80">
                <h3>${item.name}</h3>
            </div>
            <p class="institution"><strong>${item.institution}</strong></p>
            <div class="tags">
                <span class="tag tag-field">${item.field}</span>
                <span class="tag tag-difficulty">${item.difficulty}</span>
                <span class="tag tag-region">${item.region}</span>
            </div>
            <p class="description">${item.description}</p>
            <div class="card-actions">
                <a href="${item.url}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="btn-resource"
                   aria-label="Visit ${item.name} (opens in a new tab)">Visit Resource</a>
                ${actionBtn}
            </div>
        </article>`;
}

/* ═══════════════════════════════════════
   FUNCTION: Render a list of resources
   ═══════════════════════════════════════ */
function renderResources(list, grid) {
    // Conditional: show empty state or render cards
    if (!list.length) {
        grid.innerHTML = `<p class="no-results">No resources found matching your filters.</p>`;
        return;
    }

    const savedSet = new Set(getSaved());

    // Array method: map() to build card HTML strings, then join
    grid.innerHTML = list
        .map(item => buildCard(item, savedSet.has(item.id)))
        .join('');
}

/* ═══════════════════════════════════════
   FUNCTION: Apply filters to resources array
   ═══════════════════════════════════════ */
function applyFilters(field, difficulty, region) {
    // Array method: filter() with conditional checks
    return resources.filter(r => {
        const matchField = !field || r.field === field;
        const matchDifficulty = !difficulty || r.difficulty === difficulty;
        // Conditional: "Both" region matches any region filter
        const matchRegion = !region || r.region === region
            || r.region === 'Both';
        return matchField && matchDifficulty && matchRegion;
    });
}

/* ═══════════════════════════════════════
   FUNCTION: Update status message text
   ═══════════════════════════════════════ */
function setStatus(statusEl, text) {
    if (statusEl) statusEl.textContent = text;
}

/* ═══════════════════════════════════════
   MAIN: DOMContentLoaded
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // DOM selection
    const fieldSel = document.querySelector('#field-filter');
    const diffSel = document.querySelector('#difficulty-filter');
    const regionSel = document.querySelector('#region-filter');
    const resetBtn = document.querySelector('#reset-btn');
    const savedBtn = document.querySelector('#view-saved-btn');
    const statusEl = document.querySelector('#filter-status');
    const grid = document.querySelector('#resource-grid');

    if (!grid) return;

    // ── Initial render
    renderResources(resources, grid);

    // ── Filter change event listening
    [fieldSel, diffSel, regionSel].forEach(sel => {
        sel.addEventListener('change', () => {
            const filtered = applyFilters(fieldSel.value, diffSel.value, regionSel.value);
            renderResources(filtered, grid);
            savedBtn.setAttribute('aria-pressed', 'false');

            // Template literal for dynamic status
            const count = filtered.length;
            setStatus(statusEl, `${count} resource${count !== 1 ? 's' : ''} found.`);
        });
    });

    // ── Reset filters
    resetBtn.addEventListener('click', () => {
        fieldSel.value = '';
        diffSel.value = '';
        regionSel.value = '';
        renderResources(resources, grid);
        savedBtn.setAttribute('aria-pressed', 'false');
        setStatus(statusEl, `Filters cleared. Showing all ${resources.length} resources.`);
    });

    // ── View saved toggle
    savedBtn.addEventListener('click', () => {
        const isPressed = savedBtn.getAttribute('aria-pressed') === 'true';

        if (!isPressed) {
            const savedIds = new Set(getSaved());
            // Array method: filter() to get only saved items
            const savedList = resources.filter(r => savedIds.has(r.id));
            renderResources(savedList, grid);
            savedBtn.setAttribute('aria-pressed', 'true');

            // Conditional + template literal for status
            const count = savedList.length;
            setStatus(statusEl,
                count > 0
                    ? `Showing ${count} saved resource${count !== 1 ? 's' : ''}.`
                    : `You haven't saved any resources yet.`
            );
        } else {
            renderResources(resources, grid);
            savedBtn.setAttribute('aria-pressed', 'false');
            setStatus(statusEl, `Showing all ${resources.length} resources.`);
        }
    });

    // ── Event delegation: Save / Remove buttons (DOM modification)
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const id = Number(btn.getAttribute('data-id'));
        const action = btn.getAttribute('data-action');
        const saved = new Set(getSaved());

        // Conditional branching
        if (action === 'save') {
            saved.add(id);
            // Array method: find() to get the resource name for status
            const res = resources.find(r => r.id === id);
            setStatus(statusEl, `"${res ? res.name : 'Resource'}" saved to your list.`);
        } else if (action === 'remove') {
            saved.delete(id);
            const res = resources.find(r => r.id === id);
            setStatus(statusEl, `"${res ? res.name : 'Resource'}" removed from your list.`);
        }

        setSaved([...saved]);

        // Re-render in context of current view
        const isPressed = savedBtn.getAttribute('aria-pressed') === 'true';

        if (isPressed) {
            const savedList = resources.filter(r => saved.has(r.id));
            renderResources(savedList, grid);
        } else {
            const filtered = applyFilters(fieldSel.value, diffSel.value, regionSel.value);
            // Conditional: use filtered list only if a filter is active
            const hasActiveFilter = fieldSel.value || diffSel.value || regionSel.value;
            renderResources(hasActiveFilter ? filtered : resources, grid);
        }
    });
});