const memoryGrid = document.querySelector("#memoryGrid");
const maxCardCount = 2
const images = []

const dolphinImage = {
    src: "",
    count: 0
}
images.push(dolphinImage)

const turtleImage = {
    src: "",
    count: 0
}
images.push(turtleImage)

const kelpImage = {
    src: "",
    count: 0
}
images.push(kelpImage)

function randomImage() {
    const rdmImage = Math.floor(Math.random() )
}

function newTile() {

    const newTile = document.createElement("div");
    const tileImage = document.createElement("img");
    tileImage.src = 
    newTile.appendChild(tileIMG);
    memorygrid.appendChild(newTile)
}
