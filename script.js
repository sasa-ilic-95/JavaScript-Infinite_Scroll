const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = 'mhi1d6QRvk-HTDtwEb2rWJj37rNo7kjQTdZkSwNYlXE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded
const imageLoaded = ()=>{
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Create elements for links & photos, add to DOM
const displayPhotos = ()=>{
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function foreach object in photosArray
    photosArray.forEach(photo => {
        imageLoaded();
        // Create <a> to link to Unsplash
        const html = `<a href="${photo.links.html}" target="_blank"><img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" onload="imageLoaded()"></a>`;
        // Event Listener, check when each is finished loading
        imageContainer.insertAdjacentHTML('beforeend',html);
    });
}

// Get photos from Unsplash API
const getPhotos = async ()=>{
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}


// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
    }
});


// On load
getPhotos();