// Set current year
const yearSpan = document.querySelector("#currentyear");
yearSpan.textContent = new Date().getFullYear();

// Set last modified date
const lastModifiedElement = document.querySelector("#lastModified");
lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;