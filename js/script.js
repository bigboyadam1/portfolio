// --- 1. GEOGRAPHIC TRAVERSAL GRID LOGIC (NEW) ---

// List of visited country codes (ISO 3166-1 alpha-2) and their common names
const countryData = [
    { code: 'AL', name: 'Albania', visited: true },
    { code: 'AT', name: 'Austria', visited: true },
    { code: 'BE', name: 'Belgium', visited: true },
    { code: 'BG', name: 'Bulgaria', visited: true },
    { code: 'CN', name: 'China', visited: true },
    { code: 'HR', name: 'Croatia', visited: true },
    { code: 'CY', name: 'Cyprus', visited: true },
    { code: 'CZ', name: 'Czechia', visited: true },
    { code: 'DK', name: 'Denmark', visited: true },
    { code: 'EE', name: 'Estonia', visited: true },
    { code: 'FI', name: 'Finland', visited: true },
    { code: 'FR', name: 'France', visited: true },
    { code: 'DE', name: 'Germany', visited: true },
    { code: 'GR', name: 'Greece', visited: true },
    { code: 'HU', name: 'Hungary', visited: true },
    { code: 'IS', name: 'Iceland', visited: true },
    { code: 'IE', name: 'Ireland', visited: true },
    { code: 'IT', name: 'Italy', visited: true },
    { code: 'XK', name: 'Kosovo', visited: true },
    { code: 'KG', name: 'Kyrgyzstan', visited: true },
    { code: 'LV', name: 'Latvia', visited: true },
    { code: 'LT', name: 'Lithuania', visited: true },
    { code: 'ME', name: 'Montenegro', visited: true },
    { code: 'MK', name: 'N. Maced', visited: true },
    { code: 'PL', name: 'Poland', visited: true },
    { code: 'PT', name: 'Portugal', visited: true },
    { code: 'SK', name: 'Slovakia', visited: true },
    { code: 'ES', name: 'Spain', visited: true },
    { code: 'LK', name: 'Sri Lanka', visited: true },
    { code: 'SE', name: 'Sweden', visited: true },
    { code: 'CH', name: 'Switzerland', visited: true },
    { code: 'TH', name: 'Thailand', visited: true },
    { code: 'TN', name: 'Tunisia', visited: true },
    { code: 'TR', name: 'Turkey', visited: true },
    { code: 'GB', name: 'UK', visited: true },
    { code: 'US', name: 'USA', visited: true },
    { code: 'VN', name: 'Vietnam', visited: true },
    // Unvisited countries
    { code: 'AR', name: 'Argentina', visited: false },
    { code: 'AU', name: 'Australia', visited: false },
    { code: 'BR', name: 'Brazil', visited: false },
    { code: 'CA', name: 'Canada', visited: false },
    { code: 'CL', name: 'Chile', visited: false },
    { code: 'CO', name: 'Colombia', visited: false },
    { code: 'EG', name: 'Egypt', visited: false },
    { code: 'IN', name: 'India', visited: false },
    { code: 'ID', name: 'Indonesia', visited: false },
    { code: 'JP', name: 'Japan', visited: false },
    { code: 'KE', name: 'Kenya', visited: false },
    { code: 'MY', name: 'Malaysia', visited: false },
    { code: 'MX', name: 'Mexico', visited: false },
    { code: 'MA', name: 'Morocco', visited: false },
    { code: 'NZ', name: 'New Zealand', visited: false },
    { code: 'NO', name: 'Norway', visited: false },
    { code: 'PE', name: 'Peru', visited: false },
    { code: 'PH', name: 'Philippines', visited: false },
    { code: 'RU', name: 'Russia', visited: false },
    { code: 'SG', name: 'Singapore', visited: false },
    { code: 'ZA', name: 'South Africa', visited: false },
    { code: 'KR', name: 'South Korea', visited: false },
    { code: 'AE', name: 'UAE', visited: false },
];
function renderTravelGrid() {
    const gridContainer = document.getElementById('travel-country-grid');
    if (!gridContainer) return; // Guard clause

    gridContainer.innerHTML = ''; // Clear existing content

    countryData.forEach(country => {
        const chip = document.createElement('div');
        chip.classList.add('country-chip');
        if (country.visited) {
            chip.classList.add('visited');
        }

        // Display the country's short name
        chip.innerHTML = `<span class="mono">${country.name}</span>`;

        // Optional: Add the code as a tooltip
        chip.setAttribute('title', country.name + ' (' + country.code + ')');

        gridContainer.appendChild(chip);
    });
}

// --- 2. CORE SYSTEM FUNCTIONS ---

// Clock Function
function updateTime() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        clockElement.innerText = now.toISOString().split('T')[1].split('.')[0] + " UTC";
    }
}
setInterval(updateTime, 1000);
updateTime();

// Dynamic Quote Stream Functionality
const heroQuotes = [
    "\"Real danger is nothing more than just living. Of course, living is merely the chaos of existence, but you have to force a little meaning onto that chaos.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Yukio Mishima, The Sailor Who Fell from Grace with the Sea</span>",
    "\"We have a saying in Tibet: If a problem can be solved there is no use worrying about it. If it can't be solved, worrying will do no good.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Heinrich Harrer, Seven Years in Tibet</span>",
    "\"We live not only in a world of thoughts, but also in a world of things. Words without experience are meaningless.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Vladimir Nabokov, Lolita</span>",
    "\"He had arrived at a state of being that knew of no differentiation between the personal and the impersonal, a state in which his old identity had been dissolved and from which he might emerge an unencumbered man.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— John Williams, Stoner</span>",
    "\"Perfect purity is possible if you turn your life into a line of poetry written with a splash of blood.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Yukio Mishima, Runaway Horses</span>",
    "\"I am looking for the people who have always been there, and belong to the places they live. The others I do not wish to see.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Norman Lewis</span>",
    "\"It is better to burn than to disappear.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Albert Camus, The Stranger</span>",
    "\"Every existing thing is born without reason, prolongs itself out of weakness, and dies by chance.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Jean-Paul Sartre, Nausea</span>",
    "\"But man is not made for defeat. A man can be destroyed but not defeated.\"\n<span style='font-size: 0.5em; display: block; margin-top: 1rem; font-weight: 400;'>— Ernest Hemingway, The Old Man and the Sea</span>"
];
let currentQuoteIndex = 0;
const heroQuoteElement = document.getElementById('hero-quote');
const updateInterval = 60000;

function updateHeroQuote() {
    if (!heroQuoteElement) return; // Guard clause

    heroQuoteElement.style.opacity = 0;

    setTimeout(() => {
        const currentQuote = heroQuotes[currentQuoteIndex];
        const formattedQuote = currentQuote.replace(/\n/g, '<br>');
        heroQuoteElement.innerHTML = formattedQuote;

        heroQuoteElement.style.opacity = 1;

        currentQuoteIndex = (currentQuoteIndex + 1) % heroQuotes.length;
    }, 500);
}

if (heroQuoteElement) {
    updateHeroQuote();
    setInterval(updateHeroQuote, updateInterval);
}


// --- 3. SCROLL AND CURSOR FUNCTIONS ---

// Smooth Scroll (LENIS)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Cursor & Scroll Velocity Monitor
const cursor = document.querySelector('.cursor');
const speedDisplay = document.getElementById('scroll-speed');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));

    // Interactive Elements
    document.querySelectorAll('a, .data-block, .gallery-item-preview, .book-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

// Monitor Scroll Speed
if (speedDisplay) {
    lenis.on('scroll', (e) => {
        speedDisplay.innerText = Math.abs(e.velocity).toFixed(2);
    });
}

// Initialize map replacement on load
document.addEventListener('DOMContentLoaded', renderTravelGrid);


// --- 4. LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.gallery-item-preview img').forEach(img => {
        img.parentElement.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// --- 5. LANGUAGES DROPDOWN TOGGLE ---
function toggleLanguages() {
    const content = document.getElementById('languagesContent');
    content.classList.toggle('active');
}
