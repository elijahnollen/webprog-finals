/* element references for the timeline and gallery components */
const wrapper = document.getElementById('wrapper');
const line = document.getElementById('line');
const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.item');
const wheel = document.getElementById('wheel');

/* Calculates and applies horizontal scroll position based on mouse movement across the screen */
wrapper.addEventListener('mousemove', (e) => {
    const screenWidth = window.innerWidth;
    const startPos = items[0].offsetLeft - 100; 
    const endPos = items[items.length - 1].offsetLeft + items[items.length - 1].offsetWidth - screenWidth + 100;

    const moveX = startPos + ((e.clientX / screenWidth) * (endPos - startPos));
    line.style.transform = `translateX(-${Math.max(0, moveX)}px)`;
});

/* Manages selection state of timeline items when a navigation dot is clicked */
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    });
});

/* Resets the timeline state by hiding all active cards when clicking on empty space */
wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper || e.target === line) {
        items.forEach(item => item.classList.remove('active'));
    }
});

/* Updates the CSS rotation of the gallery wheel based on button input */
let currentRotation = 0;
function rotateGallery(direction) {
    const step = 60; 
    currentRotation += (direction === 'next' ? -step : step);
    wheel.style.transform = `rotate(${currentRotation}deg)`;
}