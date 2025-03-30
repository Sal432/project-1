// Generate Static Stars
const starsContainer = document.querySelector('.stars');
const numStaticStars = 200; // Number of static stars

for (let i = 0; i < numStaticStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Randomize star size (1px to 3px)
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Randomize star position (top half only)
    star.style.top = `${Math.random() * 50}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Randomize twinkle delay
    star.style.animationDelay = `${Math.random() * 2}s`;

    starsContainer.appendChild(star);
}

// Generate Shooting Stars
const numShootingStars = 5; // Fewer shooting stars for better pacing

for (let i = 0; i < numShootingStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star', 'shooting-star');

    // Randomize shooting star position (top half only)
    star.style.top = `${Math.random() * 50}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Randomize shooting delay (spaced out)
    star.style.animationDelay = `${Math.random() * 10}s`; // Longer delay for better pacing

    starsContainer.appendChild(star);
}

// Handle Form Submission
document.getElementById('emailForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const emailText = document.querySelector('textarea[name="email_text"]').value.trim(); // Trim whitespace

    // Validate input
    if (!emailText) {
        document.getElementById('predictionResult').textContent = 'Please enter an email text.';
        return;
    }

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_text: emailText }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Display the prediction result
        if (result.prediction === 'spam') {
            document.getElementById('predictionResult').textContent = 'This is a Spam Email!';
        } else {
            document.getElementById('predictionResult').textContent = 'This is a Ham Email.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('predictionResult').textContent = 'An error occurred. Please try again.';
    }
});