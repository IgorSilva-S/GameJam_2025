const memoryGrid = document.querySelector("#memoryGrid")
const restart = document.querySelector("#restartButton")
const pairsDisplay = document.querySelector("#memoryPairs")
const gameCards = []
const gameCardContainers = []
let pairs = 0
let maxCardCount = 4
let activeCards = []
let twoCards = false

let cards = [
    {
        src: "../img/Lucca/memoryCards/dolphinCard.png",
        type: "dolphin"
    },
    {
        src: "../img/Lucca/memoryCards/dolphinCard.png",
        type: "dolphin"
    },
    {
        src: "../img/Lucca/memoryCards/dolphinCard.png",
        type: "dolphin"
    },
    {
        src: "../img/Lucca/memoryCards/dolphinCard.png",
        type: "dolphin"
    },
    {
        src: "../img/Lucca/memoryCards/kelpCard.png",
        type: "kelp"
    },
    {
        src: "../img/Lucca/memoryCards/kelpCard.png",
        type: "kelp"
    },
    {
        src: "../img/Lucca/memoryCards/kelpCard.png",
        type: "kelp"
    },
    {
        src: "../img/Lucca/memoryCards/kelpCard.png",
        type: "kelp"
    },
    {
        src: "../img/Lucca/memoryCards/sharkCard.png",
        type: "shark"
    },
    {
        src: "../img/Lucca/memoryCards/sharkCard.png",
        type: "shark"
    },
    {
        src: "../img/Lucca/memoryCards/sharkCard.png",
        type: "shark"
    },
    {
        src: "../img/Lucca/memoryCards/sharkCard.png",
        type: "shark"
    },
    {
        src: "../img/Lucca/memoryCards/whaleCard.png",
        type: "whale"
    },
    {
        src: "../img/Lucca/memoryCards/whaleCard.png",
        type: "whale"
    },
    {
        src: "../img/Lucca/memoryCards/whaleCard.png",
        type: "whale"
    },
    {
        src: "../img/Lucca/memoryCards/whaleCard.png",
        type: "whale"
    },
    {
        src: "../img/Lucca/memoryCards/jellyfishCard.png",
        type: "jellyfish"
    },
    {
        src: "../img/Lucca/memoryCards/jellyfishCard.png",
        type: "jellyfish"
    },
    {
        src: "../img/Lucca/memoryCards/jellyfishCard.png",
        type: "jellyfish"
    },
    {
        src: "../img/Lucca/memoryCards/jellyfishCard.png",
        type: "jellyfish"
    },
]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
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
        backImage.classList.add("backImage")
        cardFront.classList.add("front")
        cardBack.classList.add("back")
        newCard.classList.add(card.type)
        newCard.classList.add("card")
        cardContainer.classList = "cardContainer"
        cardBack.appendChild(backImage)
        newCard.appendChild(cardFront)
        newCard.appendChild(cardBack)
        cardContainer.appendChild(newCard)
        gameCardContainers.push(cardContainer)
        gameCards.push(newCard)
        memoryGrid.appendChild(cardContainer)

        cardContainer.addEventListener('click', (e) => {

            if (twoCards === false && cardContainer.classList.contains("active") === false) {

                activeCards.push(newCard)

                if (activeCards.length === 2 && activeCards[0].className != activeCards[1].className) {
                    twoCards = true
                    setTimeout(() => {
                        twoCards = false
                        for (const card of gameCardContainers) {
                            card.classList.remove("active")
                        }
                    }, 1250);
                    setTimeout(() => {
                        for (const card of activeCards) {
                            card.style.transform = "rotateY(0deg)"
                            activeCards = []
                        }
                    }, 1100);
                } else if (activeCards.length === 2 && activeCards[0].className === activeCards[1].className) {
                    pairs++
                    pairsDisplay.innerHTML = `Pontos: ${pairs}`
                    setTimeout(() => {
                        for (const card of activeCards) {
                            card.style.transform = "rotateY(540deg)"
                            card.style.transform += "scale(1.1)"
                            activeCards = []
                        }
                    }, 250);

                }

                newCard.style.transform = "rotateY(180deg)"
                cardContainer.classList.add("active")
            }

        })

    }
}

addCards()

function restartGame() {
    setTimeout(() => {
        addCards()
    }, 1251);
    for (const card of gameCards) {
        card.style.transform = "rotateY(0deg)"
        setTimeout(() => {
            card.parentElement.remove()
            pairs = 0
            activeCards = []
            twoCards = false
            gameCards = []
            gameCardContainers = []
        }, 1250);
    }
}

restart.addEventListener('click', restartGame)