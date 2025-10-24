const pedidosDiv = document.getElementById('pedidos')
const pedidos = {

}
// for (const p of pedidosDiv.querySelectorAll('.pedido')){
//     pedidos[pedidos.length] = p
// }
const esteira = document.getElementById('esteira')
const pao = esteira.querySelector('#pao')
const salada = esteira.querySelector('#salada')
const carne = esteira.querySelector('#carne')
const espacos = esteira.querySelector('#espaços')
const esteira1 = espacos.querySelector('#slot1')
const esteira2 = espacos.querySelector('#slot2')
const esteira3 = espacos.querySelector('#slot3')
const esteira4 = espacos.querySelector('#slot4')
const esteiras = {
    1: esteira1,
    2: esteira2,
    3: esteira3,
    4: esteira4
}
let lifes = 5
const lixo = esteira.querySelector('#lixo')
const entrega = esteira.querySelector('#entrega')

function startGame(params) {
    
}

function endGame() {
    alert('Game Over! Suas vidas acabaram.')
}

function verificarPedido(entrega, pedidosContainer) {
    const entregaImgs = Array.from(entrega.querySelectorAll('img')).map(img => img.src)

    const pedidos = Array.from(pedidosContainer.querySelectorAll('.pedido'))

    for (const pedido of pedidos) {
        const pedidoImgs = Array.from(pedido.querySelectorAll('img')).map(img => img.src)

        const mesmoTamanho = pedidoImgs.length === entregaImgs.length
        const todosIguais = mesmoTamanho && pedidoImgs.every(src => entregaImgs.includes(src))

        if (todosIguais) {
            return pedido
        }
    }

    return null
}

function criarPrato() {
    const prato = document.createElement('img')
    prato.src = '../img/icons/food/prato.png'
    esteira1.appendChild(prato)
}

function colocarIngrediente(ingrediente, esteira) {
    if (ingrediente == 'Pão redondo inferior' && esteiras[esteira].querySelector('img').src?.includes('Pão redondo inferior.png')) {
        ingrediente == 'Pão redondo superior'
    }
    const img = document.createElement('img')
    img.src = `../img/icons/food/${ingrediente}.png`
    esteiras[esteira].appendChild(img)
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'ArrowLeft') {
        if (esteiras[1].childElementCount === 0) {
            for (let i = 2; i <= 4; i++) {
                if (esteiras[i].childElementCount > 0) {
                    while (esteiras[i].firstElementChild) {
                        esteiras[i - 1].appendChild(esteiras[i].firstElementChild)
                    }
                }
            }

            while (lixo.firstElementChild) {
                esteiras[4].appendChild(lixo.firstElementChild)
            }

            while (entrega.firstElementChild) {
                lixo.appendChild(entrega.firstElementChild)
            }
        }
    }
    if (event.key === 'd' || event.key === 'ArrowRight') {
        if (esteiras[4].childElementCount === 0) {
            const pedidoCorreto = verificarPedido(entrega, pedidosDiv)
            if (pedidoCorreto) {
                console.log('✅ Pedido correto! ✅')
                pedidoCorreto.remove()
                entrega.innerHTML = ''
            } else {
                console.log('❌ Pedido errado! ❌')
                entrega.innerHTML = ''
                lifes -= 1
            }
            
            while (lixo.firstElementChild) {
                entrega.appendChild(lixo.firstElementChild)
            }
            
            while (esteiras[4].firstElementChild) {
                lixo.appendChild(esteiras[4].firstElementChild)
            }

            const lixoCorreto = verificarPedido(lixo, pedidosDiv)
            if (lixoCorreto) {
            } else {
                console.log('❌ Pedido errado! ❌')
                lixo.innerHTML = ''
                lifes -= 1
            }

            for (let i = 3; i >= 1; i--) {
                if (esteiras[i].childElementCount > 0) {
                    while (esteiras[i].firstElementChild) {
                        esteiras[i + 1].appendChild(esteiras[i].firstElementChild)
                    }
                }
            }
        }
    }
    if (lifes == 0) {
        endGame()
    }
})
