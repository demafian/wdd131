/*
  GlobalDev Roadmap
  Author: Sizwe Arthur Nkosi
  Purpose: Resources gallery (render, filter, save/remove) + localStorage
*/

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
        description: "Local meetups and talks focused on OSS and web fundamentals.",
        url: "https://www.meetup.com/topics/open-source/za/",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Meetup_Logo.png"
    }
];

const LS_KEY = "savedResources";
const $ = (sel) => document.querySelector(sel);

const getSaved = () => JSON.parse(localStorage.getItem(LS_KEY) || "[]");
const setSaved = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

function renderResources(list, grid) {
    const savedSet = new Set(getSaved());

    if (!list.length) {
        grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No resources found matching your filters.</p>`;
        return;
    }

    grid.innerHTML = list.map(item => `
    <article class="resource-card">
      <div class="card-header">
        <img src="${item.image}" alt="${item.name}" class="resource-icon" loading="lazy" decoding="async" style="object-fit: contain; background: #fff; padding: 5px; border-radius: 4px;">
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
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn-resource">Visit Resource</a>
        ${savedSet.has(item.id)
            ? `<button class="btn-reset" data-action="remove" data-id="${item.id}">Remove</button>`
            : `<button class="btn-save" data-action="save" data-id="${item.id}">Save</button>`
        }
      </div>
    </article>
  `).join("");
}

function applyFilters({ field, difficulty, region }) {
    return resources.filter(r =>
        (!field || r.field === field) &&
        (!difficulty || r.difficulty === difficulty) &&
        (!region || r.region === region)
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const fieldSel = $("#field-filter");
    const diffSel = $("#difficulty-filter");
    const regionSel = $("#region-filter");
    const resetBtn = $("#reset-btn");
    const savedBtn = $("#view-saved-btn");
    const status = $("#filter-status");
    const grid = $("#resource-grid");

    // Initial render
    renderResources(resources, grid);

    // Filter changes
    [fieldSel, diffSel, regionSel].forEach(sel => sel.addEventListener("change", () => {
        const filtered = applyFilters({
            field: fieldSel.value || "",
            difficulty: diffSel.value || "",
            region: regionSel.value || ""
        });
        renderResources(filtered, grid);
        if (status) status.textContent = "Filters applied.";
        if (savedBtn) savedBtn.setAttribute("aria-pressed", "false");
    }));

    // Reset
    resetBtn.addEventListener("click", () => {
        fieldSel.value = "";
        diffSel.value = "";
        regionSel.value = "";
        renderResources(resources, grid);
        savedBtn.setAttribute("aria-pressed", "false");
        if (status) status.textContent = "Filters cleared. Showing all resources.";
    });

    // View saved toggle
    savedBtn.addEventListener("click", () => {
        const isPressed = savedBtn.getAttribute("aria-pressed") === "true";
        if (!isPressed) {
            const savedSet = new Set(getSaved());
            const savedList = resources.filter(r => savedSet.has(r.id));
            renderResources(savedList, grid);
            savedBtn.setAttribute("aria-pressed", "true");
            if (status) status.textContent = "Showing your saved resources.";
        } else {
            renderResources(resources, grid);
            savedBtn.setAttribute("aria-pressed", "false");
            if (status) status.textContent = "Showing all resources.";
        }
    });

    // Event delegation: Save/Remove
    grid.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;

        const id = Number(btn.getAttribute("data-id"));
        const action = btn.getAttribute("data-action");
        const saved = new Set(getSaved());

        if (action === "save") {
            saved.add(id);
            if (status) status.textContent = "Resource saved.";
        } else if (action === "remove") {
            saved.delete(id);
            if (status) status.textContent = "Resource removed.";
        }

        setSaved([...saved]);

        // Re-render according to current view (respect saved toggle)
        const isPressed = savedBtn.getAttribute("aria-pressed") === "true";
        if (isPressed) {
            const savedList = resources.filter(r => saved.has(r.id));
            renderResources(savedList, grid);
        } else {
            // Re-apply current filters if any
            const filtered = applyFilters({
                field: fieldSel.value || "",
                difficulty: diffSel.value || "",
                region: regionSel.value || ""
            });
            const list = (fieldSel.value || diffSel.value || regionSel.value) ? filtered : resources;
            renderResources(list, grid);
        }
    });
});