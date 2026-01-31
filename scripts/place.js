document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const tempC = 9;
const windKmh = 12;

// Requirement: Single-line calculation function
const calculateWindChill = (t, v) => 13.12 + (0.6215 * t) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * t * Math.pow(v, 0.16));

let chillValue = "N/A";

// Requirement: Only call if Temp <= 10°C and Wind > 4.8 km/h
if (tempC <= 10 && windKmh > 4.8) {
    chillValue = `${calculateWindChill(tempC, windKmh).toFixed(1)}°C`;
}

document.getElementById("windchill").textContent = chillValue;