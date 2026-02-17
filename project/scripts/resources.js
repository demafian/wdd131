/* GLOBALDEV ROADMAP - RESOURCE DATA
   Assets provided for Harvard, Google, IBM, FreeCodeCamp, MIT, Coursera, Udacity, Khan Academy
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
        url: "https://cs50.harvard.edu",
        image: "https://pll.harvard.edu/sites/default/files/styles/16_9_large/public/course/CS50x_pll.png?itok=AxciDjWM",
        efficiency: "High - Rigorous algorithm focus"
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
        image: "https://media.licdn.com/dms/image/sync/v2/D4E27AQEaUBol2YpQMQ/articleshare-shrink_800/B4EZtzxgzrGoAI-/0/1767173918274?e=2147483647&v=beta&t=4cJdn7Ujt9CiyKZUdvSF_3WoAzPKuCg5OOEC4aPKJIc",
        efficiency: "High - Optimized for production"
    },
    {
        id: 3,
        name: "IBM Data Science",
        institution: "IBM",
        field: "Data Science & AI",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "Mastering data-driven decision making. Covers Python, machine learning, and data analysis.",
        url: "https://www.ibm.com/training",
        image: "https://raw.githubusercontent.com/roshangrewal/IBM-Data-Science-Professional-Certification/master/IBM-Banner.png",
        efficiency: "High - Practical data engineering"
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
        image: "https://i.pcmag.com/imagery/reviews/01tPXClg2WjLamQzScplH3y-15..v1627670281.png",
        efficiency: "High - Project-based learning"
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
        image: "https://massworld.news/wp-content/uploads/2023/02/MIT-Logo.png",
        efficiency: "Very High - University-grade rigor"
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
        image: "https://www.aidoos.com/media/aidoos_product/Coursera.png",
        efficiency: "High - Industry-standard concepts"
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
        image: "https://miro.medium.com/1*c0CdMMI9iCGeghAgO2cq5A.png",
        efficiency: "High - Industry partnerships"
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
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1UU6QIUKZWMnX3tkSG6hxT4xmgKKEmhtmcA&s",
        efficiency: "High - Low bandwidth optimized"
    }
];

// Core Display Logic
function displayResources(resourcesToDisplay = resources, containerId = 'resource-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const savedIds = JSON.parse(localStorage.getItem('savedResources')) || [];

    if (resourcesToDisplay.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No resources found matching your filters.</p>';
        return;
    }

    resourcesToDisplay.forEach(resource => {
        const isSaved = savedIds.includes(resource.id);
        const card = document.createElement('article');
        card.className = 'resource-card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${resource.image}" alt="${resource.name}" class="resource-icon" loading="lazy" decoding="async" style="object-fit: contain; background: #fff; padding: 5px; border-radius: 4px;">
                <h3>${resource.name}</h3>
            </div>
            <p class="institution"><strong>${resource.institution}</strong></p>
            <div class="tags">
                <span class="tag tag-field">${resource.field}</span>
                <span class="tag tag-difficulty">${resource.difficulty}</span>
            </div>
            <p class="description">${resource.description}</p>
            <div class="card-actions">
                <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="btn-resource">Visit Resource</a>
                ${isSaved
                ? `<button class="btn-reset" onclick="handleRemove(${resource.id})">Remove</button>`
                : `<button class="btn-save" onclick="handleSave(${resource.id})">Save</button>`
            }
            </div>
        `;
        container.appendChild(card);
    });
}

// State Management
function handleSave(id) {
    let saved = JSON.parse(localStorage.getItem('savedResources')) || [];
    if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem('savedResources', JSON.stringify(saved));
        displayResources();
    }
}

function handleRemove(id) {
    let saved = JSON.parse(localStorage.getItem('savedResources')) || [];
    saved = saved.filter(savedId => savedId !== id);
    localStorage.setItem('savedResources', JSON.stringify(saved));
    displayResources();
}

// Filter Logic helper
function filterResources(field, difficulty, region) {
    return resources.filter(r => {
        return (!field || r.field === field) &&
            (!difficulty || r.difficulty === difficulty) &&
            (!region || r.region === region);
    });
}