// Resource data structure
const resources = [
    // Harvard CS50
    {
        id: 1,
        name: "Harvard CS50",
        institution: "Harvard University",
        field: "Computer Science",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "The gold standard for Computer Science fundamentals. Covers algorithms, data structures, and core CS principles.",
        url: "https://cs50.harvard.edu",
        image: "images/alexander-sinn-unsplash.jpg",
        efficiency: "High - Rigorous algorithm focus"
    },
    // Google DevOps
    {
        id: 2,
        name: "Google DevOps",
        institution: "Google",
        field: "DevOps & Systems",
        difficulty: "Advanced",
        region: "International Remote",
        description: "Professional automation and systems engineering. Learn infrastructure, CI/CD pipelines, and cloud deployment.",
        url: "https://cloud.google.com/training",
        image: "images/marvin-meyer-unsplash.jpg",
        efficiency: "High - Optimized for production environments"
    },
    // IBM Data Science
    {
        id: 3,
        name: "IBM Data Science",
        institution: "IBM",
        field: "Data Science & AI",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "Mastering data-driven decision making. Covers Python, machine learning, and data analysis.",
        url: "https://www.ibm.com/training",
        image: "images/alina-grubnyak-unsplash.jpg",
        efficiency: "High - Practical data engineering skills"
    },
    // FreeCodeCamp Web Dev
    {
        id: 4,
        name: "FreeCodeCamp Web Development",
        institution: "FreeCodeCamp",
        field: "Web Development",
        difficulty: "Beginner",
        region: "International Remote",
        description: "Complete web development curriculum covering HTML, CSS, JavaScript, React, and backend technologies.",
        url: "https://www.freecodecamp.org",
        image: "images/walkator-unsplash.jpg",
        efficiency: "High - Project-based learning"
    },
    // MIT OpenCourseWare
    {
        id: 5,
        name: "MIT OpenCourseWare",
        institution: "MIT",
        field: "Computer Science",
        difficulty: "Advanced",
        region: "International Remote",
        description: "Free access to MIT course materials including algorithms, mathematics, and advanced CS topics.",
        url: "https://ocw.mit.edu",
        image: "images/alex-kotliarskyi-unsplash.jpg",
        efficiency: "Very High - University-grade rigor"
    },
    // Coursera AI Specialization
    {
        id: 6,
        name: "Coursera AI Specialization",
        institution: "Coursera / Stanford",
        field: "AI & Machine Learning",
        difficulty: "Advanced",
        region: "International Remote",
        description: "Comprehensive AI and machine learning specialization. Covers neural networks, deep learning, and practical applications.",
        url: "https://www.coursera.org",
        image: "images/andrea-de-santis-unsplash.jpg",
        efficiency: "High - Industry-standard AI concepts"
    },
    // Udacity Nanodegree
    {
        id: 7,
        name: "Udacity Nanodegree Programs",
        institution: "Udacity",
        field: "Web Development",
        difficulty: "Intermediate",
        region: "International Remote",
        description: "Career-focused nanodegrees in web development, mobile development, and cloud computing.",
        url: "https://www.udacity.com",
        image: "images/hoi-an-and-da-nang-photographer-unsplash.jpg",
        efficiency: "High - Industry partnerships"
    },
    // Khan Academy
    {
        id: 8,
        name: "Khan Academy Computer Science",
        institution: "Khan Academy",
        field: "Computer Science",
        difficulty: "Beginner",
        region: "Both",
        description: "Free foundational computer science and programming courses. Great starting point for beginners.",
        url: "https://www.khanacademy.org",
        image: "images/pexels-cottonbro.jpg",
        efficiency: "High - Low bandwidth option available"
    }
];

// Filtering functions
function filterResources(field = null, difficulty = null, region = null) {
    return resources.filter(resource => {
        const fieldMatch = !field || resource.field === field;
        const difficultyMatch = !difficulty || resource.difficulty === difficulty;
        const regionMatch = !region || resource.region === region;
        return fieldMatch && difficultyMatch && regionMatch;
    });
}

// Get unique values for filters
function getUniqueFields() {
    return [...new Set(resources.map(r => r.field))];
}

function getUniqueDifficulties() {
    return [...new Set(resources.map(r => r.difficulty))];
}

function getUniqueRegions() {
    return [...new Set(resources.map(r => r.region))];
}

// Display resources in the DOM
function displayResources(resourcesToDisplay = resources, containerId = 'resource-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (resourcesToDisplay.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No resources match your criteria.</p>';
        return;
    }

    resourcesToDisplay.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${resource.image}" alt="${resource.name}" class="resource-icon">
                <h3>${resource.name}</h3>
            </div>
            <p class="institution"><strong>${resource.institution}</strong></p>
            <div class="tags">
                <span class="tag tag-field">${resource.field}</span>
                <span class="tag tag-difficulty">${resource.difficulty}</span>
                <span class="tag tag-region">${resource.region}</span>
            </div>
            <p class="description">${resource.description}</p>
            <p class="efficiency"><strong>Efficiency:</strong> ${resource.efficiency}</p>
            <a href="${resource.url}" target="_blank" class="btn-resource">Visit Resource</a>
            <button class="btn-save" onclick="saveForLater(${resource.id})">Save for Later</button>
        `;
        container.appendChild(card);
    });
}

// Save for Later functionality using localStorage
function saveForLater(resourceId) {
    let saved = JSON.parse(localStorage.getItem('savedResources')) || [];

    if (!saved.includes(resourceId)) {
        saved.push(resourceId);
        localStorage.setItem('savedResources', JSON.stringify(saved));
        alert('Resource saved for later!');
    } else {
        alert('This resource is already in your saved list.');
    }
}

// Get saved resources
function getSavedResources() {
    const savedIds = JSON.parse(localStorage.getItem('savedResources')) || [];
    return resources.filter(r => savedIds.includes(r.id));
}

// Remove from saved
function removeSavedResource(resourceId) {
    let saved = JSON.parse(localStorage.getItem('savedResources')) || [];
    saved = saved.filter(id => id !== resourceId);
    localStorage.setItem('savedResources', JSON.stringify(saved));
}
