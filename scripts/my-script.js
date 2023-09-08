function adjustSections(container) {
    var scrollLeft = container.scrollLeft;

    container.querySelectorAll('section').forEach(function(section, i) {
        var img = section.querySelector('img');
        var title = section.querySelector('h2');
        var text = section.querySelector('p');

        // calculate the start and end boundaries of each section
        var sectionStart = img.width * i - img.width / 2;
        var sectionEnd = img.width * (i + 1) - img.width / 2;
 
        if (scrollLeft >= sectionStart && scrollLeft < sectionEnd) {
            // If the section is in the viewport, animate the title and text
            title.style.bottom = '85%';
            text.style.top = '15%';
        } else {
            // If the section is not in the viewport, reset the title and text position
            title.style.bottom = '150%';
            text.style.top = '150%';
        }
    });
}

var containers = document.querySelectorAll('.main-container');

containers.forEach(function(container) {
    // Call function on page load or refresh
    adjustSections(container);

    // Add scroll event listener for each container
    container.addEventListener('scroll', function() {
      adjustSections(container);
    });

    container.querySelectorAll('.arrow.right').forEach(function(arrowRight) {
        arrowRight.addEventListener('click', function(e) { 
            // Find the section that the arrow belongs to
            var section = e.target.parentElement.parentElement;
            // Find the next section 
            var nextSection = section.nextElementSibling;
            // If there is a next section, scroll to it
            if (nextSection) {
                // Calculate the center of the viewport
                var centerOfViewport = window.innerWidth / 2;
                // Calculate the center of the image
                var centerOfImage = nextSection.offsetLeft + (nextSection.offsetWidth / 2);
                // Calculate the scroll amount
                var scrollAmount = centerOfImage - centerOfViewport;
                
                container.scroll({
                    left: scrollAmount, 
                    behavior: 'smooth'  
                });
            }
        });
    });

    container.querySelectorAll('.arrow.left').forEach(function(arrowLeft) {
        arrowLeft.addEventListener('click', function(e) { 
            // Find the section that the arrow belongs to
            var section = e.target.parentElement.parentElement;
            // Find the previous section 
            var previousSection = section.previousElementSibling;
            // If there is a previous section, scroll to it
            if (previousSection) {
                // Calculate the center of the viewport
                var centerOfViewport = window.innerWidth / 2;
                // Calculate the center of the image
                var centerOfImage = previousSection.offsetLeft + (previousSection.offsetWidth / 2);
                // Calculate the scroll amount
                var scrollAmount = centerOfImage - centerOfViewport;

                container.scroll({
                    left: scrollAmount, 
                    behavior: 'smooth' 
                });
            }
        });
    });
});
