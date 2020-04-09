const BASE_URL = 'http://localhost:3000/cards'

window.addEventListener('DOMContentLoaded', (e) => {
    renderCards('Hunter')
});

async function renderCards(className) {
    const card_data = await getCards(className)
    console.log(card_data)
}

async function getCards(className) {
    const resp = await fetch(`${BASE_URL}?class=${className}`)
    const json = await resp.json()
    return json
}