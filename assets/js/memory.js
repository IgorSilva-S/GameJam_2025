const memoryGrid = document.querySelector("#memoryGrid")
let maxCardCount = 2
let activeCards = []

let cards = [
    {
        src: "../img/icons/memoryCards/dolphin.jpg",
    },
    {
        src: "../img/icons/memoryCards/dolphin.jpg",
    },
    {
        src: "../img/icons/memoryCards/kelp.jpg",
    },
    {
        src: "../img/icons/memoryCards/kelp.jpg",
    },
    {
        src: "../img/icons/memoryCards/shark.png",
    },
    {
        src: "../img/icons/memoryCards/shark.png",
    },
]

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--){
        const random = Math.floor(Math.random() * (i + 1));

        [array[i], array[random]] = [array[random], array[i]];
    }
}

function addCards() {
    shuffleArray(cards)
    for (const card of cards) {
        const cardContainer = document.createElement("div")
        const newCard = document.createElement("div")
        const cardFront = document.createElement("div")
        const cardBack = document.createElement("div")
        const backImage = document.createElement("img")
        backImage.src = card.src
        backImage.classList = "backImage"
        cardFront.classList = "front"
        cardBack.classList = "back"
        newCard.classList = "card"
        cardContainer.classList = "cardContainer"
        cardBack.appendChild(backImage)
        newCard.appendChild(cardFront)
        newCard.appendChild(cardBack)
        cardContainer.appendChild(newCard)
        memoryGrid.appendChild(cardContainer)

        cardContainer.addEventListener('click', () => {
            activeCards.push(newCard)

            if (activeCards.length === 2) {
                setTimeout(() => {
                    for (const card of activeCards) {
                        card.style.transform = "rotateY(0deg)"
                        activeCards = []
                    }
                }, 1500);
            }

            newCard.style.transform = "rotateY(180deg)"
        })

    }
}
addCards()