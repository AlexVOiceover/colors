const canvas = document.getElementById("rouletteCircle");
const ctx = canvas.getContext("2d");
const h1 = document.querySelector("h1"); // Select the h1 element

function createSegments() {
    const numColorsTextbox = document.getElementById("numColorsTextbox");
    const numSegments = parseInt(numColorsTextbox.value);

    if (isNaN(numSegments) || numSegments < 2 || numSegments > 6) {
        alert("Please enter a number between 2 and 6.");
        numColorsTextbox.value = "3"; // Set default value to 3
    } else {
        canvas.width = canvas.height = 300; // Set canvas size
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const colors = getRandomColors(numSegments);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);

        const sectorAngle = (2 * Math.PI) / numSegments;

        for (let i = 0; i < numSegments; i++) {
            ctx.fillStyle = colors[i];
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

        for (let i = 0; i < numSegments; i++) {
            // Create a textbox for each color code
            const colorCodeTextbox = document.createElement("input");
            colorCodeTextbox.type = "text";
            colorCodeTextbox.value = colors[i];
            colorCodeTextbox.readOnly = true;

            // Add the textbox to the color code container
            colorCodeContainer.appendChild(colorCodeTextbox);
        }
        

        // Update h1 element's color dynamically
        const gradientColors = colors.join(", ");
        h1.style.background = `linear-gradient(to right, ${gradientColors})`;
        h1.style["-webkit-background-clip"] = "text";
        h1.style.color = "transparent";

    }
}

function getRandomColors(numSegments) {
    const colors = [];

    for (let i = 0; i < numSegments; i++) {
        const randomColor = getRandomColor();
        colors.push(randomColor);
    }

    return colors;
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Initial creation of segments
createSegments();
