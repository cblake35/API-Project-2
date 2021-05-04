let searchBar = document.querySelector("#search");
let gifSbmt = document.querySelector("form");
let stickerSbmt = document.querySelector("#stickerSbmt");
let imgWrapper = document.querySelector("#imgWrapper");
let myImage = document.querySelector(".myImage");
let resultBox = document.querySelector(".resultBox");
let previousBtn = document.querySelector(".previousBtn");
let nextBtn = document.querySelector(".nextBtn");
let toplinkWrapper = document.querySelector(".toplinkWrapper")
let offset = 0;
let dataType;

//function that adds a source attribute and given the value of the image url
displayRandom = (data) => {
    myImage.setAttribute('src', data.data.image_url);
}

//function that fetches a random gif from the api
randomGif = () => {
    let randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&tag=morty`

    fetch(randomUrl)
        .then(response => response.json())
        .then(data => displayRandom(data));
}

//grabs fetched data and displays a random gif in the imgWrapper div
randomGif();

//listens to the gif submit button and fetches data to display gifs into the resultBox element
gifSbmt.addEventListener("submit", (e) => {
    e.preventDefault();
    offset = 0;
    dataType = "gifs"

    let gifUrl = `https://api.giphy.com/v1/${dataType}/search?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&q=${searchBar.value}&limit=25&offset=${offset}&rating=g&lang=en`;

    fetch(gifUrl)
        .then(response => response.json())
        .then(data => displayData(data));

})

//listens to the sticker submit button and fetches data to display gifs into the resultBox element
stickerSbmt.addEventListener("click", (e) => {
    e.preventDefault();
    offset = 0;
    dataType = "stickers";

    let stickerUrl = `https://api.giphy.com/v1/${dataType}/search?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&q=${searchBar.value}&limit=25&offset=${offset}&rating=g&lang=en`;

    fetch(stickerUrl)
        .then(response => response.json())
        .then(data => displayData(data))
})

//function that takes care of displaying data into the page
displayData = (data) => {

    if (resultBox.hasChildNodes()) {
        for (let i = 0; resultBox.hasChildNodes(); i++) {
            resultBox.removeChild(resultBox.lastChild);
        }

        for (let i = 0; i < data.data.length; i++) {
            let gifImg = document.createElement("img");
            gifImg.setAttribute("src", data.data[i].images.fixed_height.url);
            resultBox.appendChild(gifImg);

            nextBtn.style.display = "inline-block";
            previousBtn.style.display = "inline-block";
            toplinkWrapper.style.display = "block";
        }

    } else {
        for (let i = 0; i < data.data.length; i++) {
            let gifImg = document.createElement("img");
            gifImg.setAttribute("src", data.data[i].images.fixed_height.url);
            resultBox.appendChild(gifImg);

            nextBtn.style.display = "inline-block";
            previousBtn.style.display = "inline-block";
            toplinkWrapper.style.display = "block";
        }
    }


}

//fetches and displays the next 25 gifs/stickers into the resultBox element
nextBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if (offset >= 0) {
        offset += 25;
        let url = `https://api.giphy.com/v1/${dataType}/search?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&q=${searchBar.value}&limit=25&offset=${offset}&rating=g&lang=en`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayData(data))
    }
})

//fetches and displays the previous 25 gifs/stickers into the resultBox element
previousBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if (offset >= 25) {
        offset -= 25;
        let url = `https://api.giphy.com/v1/${dataType}/search?api_key=evhKxU4OJtTYhhpUjeBEq2c0y68kX040&q=${searchBar.value}&limit=25&offset=${offset}&rating=g&lang=en`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayData(data))
    }
})

