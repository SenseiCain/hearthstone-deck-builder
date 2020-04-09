const BASE_URL = 'http://localhost:3000/cards'

window.addEventListener('DOMContentLoaded', (e) => {
    getCards('Hunter')
});

async function getCards(className) {
    const resp = await fetch(`${BASE_URL}?class=${className}`)
    const json = await resp.json()

    console.log(json)
}