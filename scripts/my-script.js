function createSegments() {
    const numColorsTextbox = document.getElementById("numColorsTextbox");
    const numSegments = parseInt(numColorsTextbox.value);

    if (isNaN(numSegments) || numSegments < 2 || numSegments > 6) {
        alert("Please enter a number between 2 and 6.");
        numColorsTextbox.value = "3"; // Set default value to 3
    } else {
        const rouletteCircle = document.getElementById("rouletteCircle");
        rouletteCircle.innerHTML = "";

        for (let i = 0; i < numSegments; i++) {
            const segment = document.createElement("div");
            segment.className = "segment";
            segment.style.background = getRandomColor();
            rouletteCircle.appendChild(segment);
        }
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

// Initial creation of segments
createSegments();