// 1. Corrected selectors: Use # for IDs in querySelector
const radiusOutput = document.getElementById('radius');
const areaOutput = document.querySelector('#area');

let area = 0;
// 2. Syntax fix: Changed == to = for assignment
const PI = 3.14159;
// 3. Logic fix: Changed const to let because radius value changes later
let radius = 10;

// --- First Calculation ---
area = PI * radius * radius;
// 4. Runtime fix: Use .textContent instead of assigning to the element variable
radiusOutput.textContent = radius;
areaOutput.textContent = area;

// --- Second Calculation ---
radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;