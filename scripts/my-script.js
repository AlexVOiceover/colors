function validateInput() {
    const inputElement = document.getElementById("numColorsTextbox");
    const value = parseFloat(inputElement.value);

    if (isNaN(value) || value < 2 || value > 6) {
        alert("Please enter a number between 2 and 6.");
        inputElement.value = "3"; // Set default value to 3
    }
}