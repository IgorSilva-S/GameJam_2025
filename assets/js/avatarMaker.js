const body = document.getElementById('bodyColor')
const eye = document.getElementById('avatarEye')
const barbt = document.getElementById('avatarBarbt')
const mouth = document.getElementById('avatarMouth')
const hair = document.getElementById('avatarHair')

//Pages
const colorPage = document.getElementById('colorsOpt')
const eyePage = document.getElementById('eyesOpt')
const barbtPage = document.getElementById('barbtOpt')
const mouthPage = document.getElementById('mouthOpt')
const hairPage = document.getElementById('hairOpt')

const colorButtons = document.querySelectorAll('[edit="color"]')

let avatarObj = {
    color: 0,
    hair: 1,
    eye: 0,
    barbt: 0,
    mouth: 0
}

let avatarLS = localStorage.getItem('avatar')
if (avatarLS != undefined) {
    avatarObj = JSON.parse(avatarLS)
}

body.src = `../img/avatar/body/color${avatarObj.color}.png`
hair.src = `../img/avatar/hair/hair${avatarObj.hair}.png`
eye.src = `../img/avatar/eye/eye${avatarObj.eye}.png`
barbt.src = `../img/avatar/barbt/barbt${avatarObj.barbt}.png`
mouth.src = `../img/avatar/mouth/mouth${avatarObj.mouth}.png`

colorButtons.forEach((b) => {
    b.addEventListener('click', function () {
        let id = this.id
        id = id.replace('color', '')
        id = Number(id)
        id--

        body.src = `../img/avatar/body/color${id}.png`

        avatarObj.color = id
    })
})

const hairButtons = document.querySelectorAll('[edit="hair"]')

hairButtons.forEach((b) => {
    b.addEventListener('click', function () {
        let id = this.id
        id = id.replace('hair', '')
        id = Number(id)
        console.log(id)

        hair.src = `../img/avatar/hair/hair${id}.png`
        avatarObj.hair = id
    })
})

const eyeButtons = document.querySelectorAll('[edit="eye"]')

eyeButtons.forEach((b) => {
    b.addEventListener('click', function () {
        let id = this.id
        id = id.replace('eye', '')
        id = Number(id)
        id--
        console.log(id)

        eye.src = `../img/avatar/eye/eye${id}.png`
        avatarObj.eye = id
    })
})

const barbtButtons = document.querySelectorAll('[edit="barbt"]')

barbtButtons.forEach((b) => {
    b.addEventListener('click', function () {
        let id = this.id
        id = id.replace('barbt', '')
        id = Number(id)
        id--
        console.log(id)

        barbt.src = `../img/avatar/barbt/barbt${id}.png`
        avatarObj.barbt = id
    })
})

const mouthButtons = document.querySelectorAll('[edit="mouth"]')

mouthButtons.forEach((b) => {
    b.addEventListener('click', function () {
        let id = this.id
        id = id.replace('mouth', '')
        id = Number(id)
        id--
        console.log(id)

        mouth.src = `../img/avatar/mouth/mouth${id}.png`
        avatarObj.mouth = id
    })
})

//Nav
function disableScreens() {
    colorPage.style.display = 'none'
    eyePage.style.display = 'none'
    barbtPage.style.display = 'none'
    mouthPage.style.display = 'none'
    hairPage.style.display = 'none'
}

document.getElementById('colorBtn').addEventListener('click', () => {
    disableScreens()
    colorPage.removeAttribute('style')
})

document.getElementById('eyeBtn').addEventListener('click', () => {
    disableScreens()
    eyePage.removeAttribute('style')
})

document.getElementById('barbtBtn').addEventListener('click', () => {
    disableScreens()
    barbtPage.removeAttribute('style')
})

document.getElementById('mouthBtn').addEventListener('click', () => {
    disableScreens()
    mouthPage.removeAttribute('style')
})

document.getElementById('hairBtn').addEventListener('click', () => {
    disableScreens()
    hairPage.removeAttribute('style')
})


document.getElementById('endAvatar').addEventListener('click', () => {
    let strAvatar = JSON.stringify(avatarObj)
    localStorage.setItem('avatar', strAvatar)
    window.location.href = '../../index.html'
})