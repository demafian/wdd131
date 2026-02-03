const temples = [
    { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
    { templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
    { templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
    { templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
    { templeName: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
    { templeName: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
    { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
    // 3 Unique Added Temples 
    { templeName: "Logan Utah", location: "Logan, Utah, United States", dedicated: "1884, May, 17", area: 119619, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/logan-utah/400x250/logan-temple-768119-wallpaper.jpg" },
    { templeName: "St. George Utah", location: "St. George, Utah, United States", dedicated: "1877, April, 6", area: 110000, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-temple-lds-149536-wallpaper.jpg" },
    { templeName: "Paris France", location: "Le Chesnay, France", dedicated: "2017, May, 21", area: 44175, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-exterior-1905503.jpg" },
];

const templeGrid = document.querySelector(".temple-grid");
const galleryTitle = document.getElementById("gallery-title");

function displayTemples(list) {
    templeGrid.innerHTML = "";
    list.forEach(temple => {
        const card = document.createElement("section");
        card.classList.add("temple-card");
        card.innerHTML = `
            <h3>${temple.templeName}</h3>
            <p><span class="label">Location:</span> ${temple.location}</p>
            <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
            <p><span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft</p>
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
        `;
        templeGrid.appendChild(card);
    });
}

// Event Listeners for Filtering
document.querySelector("#home").onclick = () => { galleryTitle.textContent = "Home"; displayTemples(temples); };
document.querySelector("#old").onclick = () => { galleryTitle.textContent = "Old"; displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900)); };
document.querySelector("#new").onclick = () => { galleryTitle.textContent = "New"; displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000)); };
document.querySelector("#large").onclick = () => { galleryTitle.textContent = "Large"; displayTemples(temples.filter(t => t.area > 90000)); };
document.querySelector("#small").onclick = () => { galleryTitle.textContent = "Small"; displayTemples(temples.filter(t => t.area < 10000)); };

// Initialize
displayTemples(temples);
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

// Menu Toggle
const nav = document.querySelector('.navigation');
const menuBtn = document.querySelector('#menu');
menuBtn.onclick = () => { nav.classList.toggle('open'); menuBtn.classList.toggle('open'); };