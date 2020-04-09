const BASE_URL = 'http://localhost:3000'

window.addEventListener('DOMContentLoaded', (e) => {
    renderHeros()
});


// -- HEROS --
async function getHeros() {
    const resp = await fetch(`${BASE_URL}/heros`)
    const json = await resp.json()
    return json
}

async function renderHeros() {
    const heroData = await getHeros()
    const heroContainerEl = document.querySelector('#heros-section')

    heroData.forEach(el => {
        const btn = document.createElement('button')
        btn.innerText = el.player_class
        btn.id = `btn-${el.player_class.replace(/\s+/g, '-').toLowerCase()}`;
        btn.addEventListener('click', e => renderCards(el.player_class))

        heroContainerEl.appendChild(btn)
    })
}

// -- CARDS --
async function renderCards(className) {
    const cardData = await getCards(className)
    console.log(cardData)
}

async function getCards(className) {
    const resp = await fetch(`${BASE_URL}/cards?class=${className}`)
    const json = await resp.json()
    return json
}