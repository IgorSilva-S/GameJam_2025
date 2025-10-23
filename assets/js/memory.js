const memoryGrid = document.querySelector("#memoryGrid")
let maxCardCount = 3

const cards = [
    {
        src: "../img/icons/memoryCards/dolphin.jpg",
        count: 0
    },
    {
        src: "../img/icons/memoryCards/kelp.jpg",
        count: 0
    },
    {
        src: "../img/icons/memoryCards/shark.png",
        count: 0
    },
]

let avaiableCards = cards.filter((card) => {
    if (card.count < maxCardCount) {
        return (card)
    }
})

function addCards() {
    for (let i = 0; i < (maxCardCount * cards.length); i++) {

        const newCard = document.createElement("div")
        let image = document.createElement("img")
        let randomCard = avaiableCards[Math.floor(Math.random() * maxCardCount)]
        randomCard.count++
        image.src = randomCard.src
        image.classList.add("cardImage")

        newCard.appendChild(image)
        memoryGrid.appendChild(newCard)

        avaiableCards = avaiableCards.filter((card) => {
            if (card.count < maxCardCount) {
                console.log(card)
                return (card)
            }
        })

    }
}
addCards()