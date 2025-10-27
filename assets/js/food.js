const pedidosDiv = document.getElementById('pedidos')
const pedidos = {

}
// Função para popular o objeto pedidos com os elementos .pedido
for (let i = 0; i < pedidosDiv.querySelectorAll('.pedido').length; i++) {
    pedidos[i] = pedidosDiv.querySelectorAll('.pedido')[i]
}

// for (const p in pedidosDiv.querySelectorAll('.pedido')){
//     pedidos[pedidos.length] = p
// }
console.log(pedidos[1])
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
const tiposPao = ['Pão quadrado', 'Pão redondo inferior', 'Pão triangular']
const tiposSalada = ['Alga', 'Fitoplancton', 'Tomate']
const tiposCarne = ['Peixe', 'Plancton', 'Camarao']

function startGame(params) {
    pedidosDiv.innerHTML = ''
    criarPedido()
    for (const esteira in esteiras) {
        esteira.innerHTML = ''
    }
    lixo.innerHTML = ''
    entrega.innerHTML = ''
}
document.onload = startGame()

function endGame() {
    alert('Game Over! Suas vidas acabaram.')
    startGame()
}

function verificarPedido(entrega, pedidosContainer) {
    // Função para extrair o nome do arquivo da URL da imagem
    const getFilename = (src) => {
        try {
            return decodeURIComponent(new URL(src, location.href).pathname.split('/').pop());
        } catch {
            return src;
        }
    }

    const entregaImgs = Array.from(entrega.querySelectorAll('img')).map(img => getFilename(img.src));
    const pedidos = Array.from(pedidosContainer.querySelectorAll('.pedido'));

    for (const pedido of pedidos) {
        const pedidoImgs = Array.from(pedido.querySelectorAll('img')).map(img => getFilename(img.src));

        // mesmo comprimento
        if (pedidoImgs.length !== entregaImgs.length) continue;

        // mesma ordem e mesmas ocorrências (comparação elemento a elemento)
        let ordemIgual = true;
        for (let i = 0; i < pedidoImgs.length; i++) {
            if (pedidoImgs[i] !== entregaImgs[i]) {
                ordemIgual = false;
                break;
            }
        }

        if (ordemIgual) {
            return pedido;
        }
    }

    return false;
}

function criarPrato() {
    const prato = document.createElement('img')
    prato.src = '../img/icons/food/prato.png'
    prato.classList.add('prato')
    esteira1.appendChild(prato)
}

function colocarIngrediente(ingrediente, esteira) {
    if (ingrediente == 'Pão redondo inferior' && esteiras[esteira].childElementCount > 1) {
        ingrediente = 'Pão redondo superior'
    }
    const img = document.createElement('img')
    img.src = `../img/icons/food/${ingrediente}.png`
    if (ingrediente == 'Pão redondo inferior' || ingrediente == 'Pão redondo superior') {
        img.classList.add('pão')
        img.classList.add('redondo')
    } else if (ingrediente == 'Pão quadrado' || ingrediente == 'Pão triangular') {
        img.classList.add('pão')
    }
    esteiras[esteira].appendChild(img)
}

function criarPedido() {
    const novoPedido = document.createElement('div')
    novoPedido.classList.add('pedido')
    const prato = document.createElement('img')
    prato.src = '../img/icons/food/prato.png'
    prato.classList.add('prato')
    novoPedido.appendChild(prato)
    const tipoPao = tiposPao[Math.floor(Math.random() * tiposPao.length)]
    const tipoSalada = tiposSalada[Math.floor(Math.random() * tiposSalada.length)]
    const tipoCarne = tiposCarne[Math.floor(Math.random() * tiposCarne.length)]
    const imgPao = document.createElement('img')
    imgPao.src = `../img/icons/food/${tipoPao}.png`
    imgPao.classList.add('pão')
    if (tipoPao == 'Pão redondo inferior') {
        imgPao.classList.add('redondo')
    }
    const imgSalada = document.createElement('img')
    imgSalada.src = `../img/icons/food/${tipoSalada}.png`
    const imgCarne = document.createElement('img')
    imgCarne.src = `../img/icons/food/${tipoCarne}.png`
    novoPedido.appendChild(imgPao)
    novoPedido.appendChild(imgSalada)
    novoPedido.appendChild(imgCarne)
    if (Math.random() > 0.85) {
        const tipoSalada2 = tiposSalada[Math.floor(Math.random() * tiposSalada.length)]
        const imgSalada2 = document.createElement('img')
        imgSalada2.src = `../img/icons/food/${tipoSalada2}.png`
        novoPedido.appendChild(imgSalada2)
    }
    if (Math.random() > 0.9) {
        const tipoCarne2 = tiposCarne[Math.floor(Math.random() * tiposCarne.length)]
        const imgCarne2 = document.createElement('img')
        imgCarne2.src = `../img/icons/food/${tipoCarne2}.png`
        novoPedido.appendChild(imgCarne2)
    }
    if (tipoPao == 'Pão redondo inferior') {
        const novoPao = document.createElement('img')
        novoPao.src = `../img/icons/food/Pão redondo superior.png`
        novoPao.classList.add('pão')
        novoPao.classList.add('redondo')
        novoPedido.appendChild(novoPao)
    } else {
        const novoPao = document.createElement('img')
        novoPao.src = `../img/icons/food/${tipoPao}.png`
        novoPao.classList.add('pão')
        novoPedido.appendChild(novoPao)
    }
    pedidosDiv.appendChild(novoPedido)
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
        if (entrega.childElementCount > 0) {
            const pedidoCorreto = verificarPedido(entrega, pedidosDiv)
            if (pedidoCorreto) {
                console.log('✅ Pedido correto! ✅')
                pedidoCorreto.remove()
                entrega.innerHTML = ''
                criarPedido()
            } else if (pedidoCorreto == false) {
                console.log('❌ Pedido errado! ❌')
                entrega.innerHTML = ''
                lifes -= 1
                criarPedido()
            }
        }
        
        while (lixo.firstElementChild) {
            entrega.appendChild(lixo.firstElementChild)
        }
        
        while (esteiras[4].firstElementChild) {
            lixo.appendChild(esteiras[4].firstElementChild)
        }
        
        if (lixo.childElementCount > 0) {
            const lixoCorreto = verificarPedido(lixo, pedidosDiv)
            if (lixoCorreto === false) {
                console.log('❌ Pedido errado no lixo! ❌')
                lixo.innerHTML = ''
                lifes -= 1
            } else if (lixoCorreto) {
                console.log('♻️ Pedido correto aguardando entrega...')
            }
        }

        for (let i = 3; i >= 1; i--) {
            if (esteiras[i].childElementCount > 0) {
                while (esteiras[i].firstElementChild) {
                    esteiras[i + 1].appendChild(esteiras[i].firstElementChild)
                }
            }
        }
        
    }
    if (lifes == 0) {
        endGame()
    }
})
// O prato chegou na entrega, estava certo porém deu "Pedido errado". Por que isso aconteceu?
// 