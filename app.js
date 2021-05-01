let searchBar = document.querySelector("#search");
let gifSbmt = document.querySelector("form");
let stickerSbmt = document.querySelector("#stickerSbmt");
let imgWrapper = document.querySelector("#imgWrapper");
let myImage = document.querySelector(".myImage");




displayRandom = (data) => {
    
    myImage.setAttribute('src', data.data.image_url);

}

randomGif = async () => {
    let randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&tag=morty`

   await fetch(randomUrl)
        .then(response => response.json())
        .then(data => displayRandom(data));
}

randomGif();




gifSbmt.addEventListener("submit", (e) => {
    e.preventDefault();
    let gifUrl = `https://api.giphy.com/v1/gifs/search?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&q=${searchBar.value}&limit=50&offset=0&rating=g&lang=en`;

    fetch(gifUrl)
        .then(response => response.json())
        .then(data => console.log(data));


})

stickerSbmt.addEventListener("click", (e) => {
    e.preventDefault();
    let stickerUrl = `https://api.giphy.com/v1/stickers/search?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&q=${searchBar.value}&limit=50&offset=0&rating=g&lang=en`;

    fetch(stickerUrl)
        .then(response => response.json())
        .then(data => console.log(data));


})