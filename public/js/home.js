
const greeting = document.querySelector('.greeting');
const imageContainer = document.querySelector('.image-container');

window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/login';
    } else {
        greeting.innerHTML = `Hello ${sessionStorage.name}`;
        loadImages(); // Call the function to load and display images
    }
};

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
};

// Function to load and display images
function loadImages() {
    // Assume the images folder is served by your server
    fetch('/images') // Update the endpoint based on your server setup
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received image data:', data);

            // Iterate through each date folder
            data.dates.forEach(date => {
                const dateContainer = document.createElement('div');
                dateContainer.classList.add('date-container');
                dateContainer.innerHTML = `<h2>${date.date}</h2>`;

                // Iterate through images in the date folder
                date.images.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = `/images/${date.date}/${image}`;
                    dateContainer.appendChild(imgElement);
                });

                imageContainer.appendChild(dateContainer);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}
