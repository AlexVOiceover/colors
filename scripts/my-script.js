const canvas = document.getElementById("rouletteCircle");
const ctx = canvas.getContext("2d");
const h1 = document.querySelector("h1"); // Select the h1 element

const slowSpeed = 1;
const fastSpeed = 25;
const totalFastSpins = 4;
const intervalDuration = (totalFastSpins * 2 * Math.PI * 1000) / fastSpeed; // Calculate the interval duration based on fastSpeed
let spinSpeed = slowSpeed; // Speed of spinning (initially slow)
let fastSpinsRemaining = 0; // Number of remaining fast spins
let currentRotation = 0;
let colorChanged = false;
let lockedColors = [];

// Initialize lockedColors array with color objects
function initializeLockedColors(numSegments) {
    lockedColors = Array.from({ length: numSegments }, (_, index) => ({
        color: getRandomColor(),
        selected: false,
    }));
}

function createSegments() {
    const numColorsTextbox = document.getElementById("numColorsTextbox");
    const numSegments = parseInt(numColorsTextbox.value);

    if (isNaN(numSegments) || numSegments < 2 || numSegments > 6) {
        alert("Please enter a number between 2 and 6.");
        numColorsTextbox.value = "3"; // Set default value to 3
    } else {
        canvas.width = canvas.height = 300; // Set canvas size
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        initializeLockedColors(numSegments);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);

        const sectorAngle = (2 * Math.PI) / numSegments;

        for (let i = 0; i < numSegments; i++) {
            ctx.fillStyle = lockedColors[i].color;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 2,
                i * sectorAngle,
                (i + 1) * sectorAngle
            );
            ctx.closePath();
            ctx.fill();
        }

        // Clear and update the color code container
        const colorCodeContainer = document.getElementById("colorCodeContainer");
        colorCodeContainer.innerHTML = "";

        for (let i = 0; i < numSegments; i++) {
            // Create a textbox for each color code
            const colorCodeTextbox = document.createElement("input");
            colorCodeTextbox.type = "text";
            colorCodeTextbox.value = lockedColors[i].color;
            colorCodeTextbox.readOnly = true;

            // Set the background color of the textbox
            colorCodeTextbox.style.backgroundColor = lockedColors[i].color;

            // Check if the background color is dark and adjust font color
            if (isDarkColor(lockedColors[i].color)) {
                colorCodeTextbox.style.color = "white";
            }

            // Apply the border and selected state if the color is locked
            if (lockedColors[i].selected) {
                colorCodeTextbox.classList.add("locked-color");
                colorCodeTextbox.style.borderColor = "black";
            }

            colorCodeTextbox.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent further propagation of the click event

                // Toggle the selected state for the clicked color
                lockedColors[i].selected = !lockedColors[i].selected;
                console.log("toggled selected");
                console.log(lockedColors);

                // Toggle the CSS class for visual indication
                colorCodeTextbox.classList.toggle("locked-color");

                // Set the border color based on the selected state
                if (lockedColors[i].selected) {
                    colorCodeTextbox.style.borderColor = "black";
                } else {
                    colorCodeTextbox.style.borderColor = "";
                }
            });

            // Add the textbox to the color code container
            colorCodeContainer.appendChild(colorCodeTextbox);
        }

        // Update h1 element's color dynamically
        const gradientColors = lockedColors.map((item) => item.color).join(", ");
        h1.style.background = `linear-gradient(to right, ${gradientColors})`;
        h1.style["-webkit-background-clip"] = "text";
        h1.style.color = "transparent";
    }
}


function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
} 

function isDarkColor(color) {
    // Calculate the luminance of the color to determine if it's dark
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5; // You can adjust the threshold for what you consider "dark"
    
}


function spinRoulette() {
    currentRotation += spinSpeed;
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    if (fastSpinsRemaining > 0 && fastSpinsRemaining === Math.ceil(totalFastSpins / 2) && !colorChanged) {
        // Generate new colors only once when halfway through fast spins
        createSegments();
        colorChanged = true; // Set to true so it won't change colors again
    }

    if (fastSpinsRemaining === 0) {
        colorChanged = false; // Reset color change tracker when not fast spinning
    }

    requestAnimationFrame(spinRoulette);
    
}

/// Listen for clicks on the roulette
rouletteCircle.addEventListener("click", () => {
    console.log(lockedColors);
    if (fastSpinsRemaining === 0) {
        fastSpinsRemaining = totalFastSpins; // Set the number of fast spins
        colorChanged = false; // Reset color change tracker

        // Define the initial acceleration
        let acceleration = 0.2; 
        let isAccelerating = true;

           // Function to gradually increase the spin speed
        const accelerate = () => {
            if (spinSpeed < fastSpeed) {
                spinSpeed += acceleration; // Increase the spin speed gradually
                requestAnimationFrame(accelerate);
            } else {
                isAccelerating = false; // Start decelerating
                decelerate();
            }
        };

        // Function to gradually decrease the spin speed
        const decelerate = () => {
            if (spinSpeed > slowSpeed) {
                spinSpeed -= acceleration; // Decrease the spin speed gradually
                requestAnimationFrame(decelerate);
            } else {
                spinSpeed = slowSpeed; // Ensure spin speed doesn't go below slowSpeed
            }
        };
        // Start accelerating
        accelerate();
}
});

// Update fast spins remaining and spin speed
setInterval(() => {
    if (fastSpinsRemaining > 0) {
        fastSpinsRemaining--;
        if (fastSpinsRemaining === 0) {
            spinSpeed = slowSpeed; // Reset the spin speed to slow
        }
    }
}, intervalDuration);

// Initial creation of segments
createSegments();

// Start the continuous spinning
spinRoulette();