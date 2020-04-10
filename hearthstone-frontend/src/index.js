const BASE_URL = 'http://localhost:3000'

window.addEventListener('DOMContentLoaded', async (e) => {
    // APPEND HERO BUTTONS
    const heroData = await getHeros();
    Hero.massAssign(heroData)
    const heroEls = Hero.renderAll();
    const heroContainerEl = document.querySelector('#heros-section')
    heroEls.forEach(el => heroContainerEl.appendChild(el))
});


// -- HEROS --
async function getHeros() {
    const resp = await fetch(`${BASE_URL}/heros`)
    const json = await resp.json()
    return json
}

// -- CARDS --
async function renderCards(className) {
    const cardData = await getCards(className)
    const cardsContainerEl = document.querySelector('#cards-display')

    cardsContainerEl.innerHTML = ""
    
    cardData.forEach(el => {

        const divEl = document.createElement('div')
        divEl.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3')
        
        const imgEl = document.createElement('img')
        imgEl.src = el.img
        divEl.appendChild(imgEl)

        cardsContainerEl.appendChild(divEl)
    })
}

async function getCards(className) {
    const resp = await fetch(`${BASE_URL}/cards?class=${className}`)
    const json = await resp.json()
    return json
}

// form onchage -> changeDisplayedCards() -> Card.renderAll()

// -- DOM EVENTS --
function switchCardType(e) {
    if (e.id === 'class-select' && e.classList.contains('inactive')) {
        makeClassActive()
        // -- OOP
        renderCards(activeHero)
    } else if (e.id === 'neutral-select' && e.classList.contains('inactive')) {
        makeNeutralActive()
        // -- OOP
        renderCards('Neutral')
    }
}

function makeClassActive() {
    let classBtn = document.querySelector('#class-select')
    classBtn.classList.remove('inactive')
    classBtn.classList.add('active')

    let neutralBtn = document.querySelector('#neutral-select')
    neutralBtn.classList.remove('active')
    neutralBtn.classList.add('inactive')
}

function makeNeutralActive() {
    let classBtn = document.querySelector('#class-select')
    classBtn.classList.remove('active')
    classBtn.classList.add('inactive')

    let neutralBtn = document.querySelector('#neutral-select')
    neutralBtn.classList.remove('inactive')
    neutralBtn.classList.add('active')
}