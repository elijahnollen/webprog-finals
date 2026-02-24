const nodes = Array.from(document.querySelectorAll(".node"));
const cards = Array.from(document.querySelectorAll(".zone-card"));
const statusText = document.getElementById("statusText");
const visitedText = document.getElementById("visitedText");
const tourBtn = document.getElementById("tourBtn");

const order = ["about", "skills", "education", "goals", "contact"];
const visited = new Set(["about"]);
let activeZone = "about";
let tourTimer = null;
let tourIndex = 0;

const formatLabel = (key) => key.charAt(0).toUpperCase() + key.slice(1);

function activateZone(target) {
    activeZone = target;
    visited.add(target);

    nodes.forEach((node) => {
        const selected = node.dataset.target === target;
        node.classList.toggle("is-active", selected);
        node.setAttribute("aria-pressed", String(selected));
    });

    cards.forEach((card) => {
        card.classList.toggle("is-active", card.id === `card-${target}`);
    });

    statusText.textContent = `Current zone: ${formatLabel(target)}`;
    visitedText.textContent = `Visited zones: ${visited.size} / ${order.length}`;
}

function stopTour() {
    if (tourTimer) {
        clearInterval(tourTimer);
        tourTimer = null;
        tourBtn.textContent = "Start Tour";
        tourBtn.classList.remove("ghost");
    }
}

function startTour() {
    stopTour();

    tourBtn.textContent = "Stop Tour";
    tourBtn.classList.add("ghost");

    tourTimer = setInterval(() => {
        tourIndex = (tourIndex + 1) % order.length;
        activateZone(order[tourIndex]);
    }, 2100);
}

nodes.forEach((node) => {
    node.addEventListener("click", () => {
        stopTour();
        tourIndex = order.indexOf(node.dataset.target);
        activateZone(node.dataset.target);
    });
});

tourBtn.addEventListener("click", () => {
    if (tourTimer) {
        stopTour();
        return;
    }
    tourIndex = order.indexOf(activeZone);
    startTour();
});

activateZone("about");
