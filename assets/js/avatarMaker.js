const body = document.getElementById('bodyColor')


//Pages
const colorPage = document.getElementById('colorsOpt')
const eyePage = document.getElementById('eyesOpt')

const colorButtons = document.querySelectorAll('[edit="color"]')

colorButtons.forEach((b) => {
    b.addEventListener('click', function() {
        let id = this.id
        id = id.replace('color', '')
        id = Number(id)
        id--

        body.src = `../img/avatar/body/color${id}.png`
    })
})

//Nav
function disableScreens() {
    colorPage.style.display = 'none'
    eyePage.style.display = 'none'
}

document.getElementById('colorBtn').addEventListener('click', () => {
    disableScreens()
    colorPage.removeAttribute('style')
})

document.getElementById('eyeBtn').addEventListener('click', () => {
    disableScreens()
    eyePage.removeAttribute('style')
})
