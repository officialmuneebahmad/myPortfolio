// script.js
document.addEventListener('DOMContentLoaded', () => {
    const words = ["Marhaba (مرحبًا)", "Salām (سلام)", "Hola", "Hello", "Bonjour"];
    let currentIndex = 0;
    const wordDisplay = document.getElementById('wordDisplay');

    function changeWord() {
        // Move the current word out of view
        wordDisplay.style.top = '-100%';

        // Wait for the transition to complete before updating the text
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            wordDisplay.textContent = words[currentIndex];
            
            // Reset the position to start the animation from the top
            wordDisplay.style.top = '100%';

            // Force a reflow to restart the transition
            void wordDisplay.offsetWidth;
            wordDisplay.style.top = '0';
        }, 1000); // Duration should match the CSS transition time
    }

    // Change the word every 5 seconds
    setInterval(changeWord, 5000);
});

