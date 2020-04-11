const BASE_URL = 'http://localhost:3000'
let CARD_CONFIGS = {
    set_type: 'classic',
    class_type: 'Hunter'
    // QUERY: {}
};

window.addEventListener('DOMContentLoaded', async (e) => {
    // Create Hero instances & append buttons
    const heroData = await getHeros();
    Hero.massAssign(heroData)
    const heroEls = Hero.renderAll();
    const heroContainerEl = document.querySelector('#heros-section')
    heroEls.forEach(el => heroContainerEl.appendChild(el))

    // Cards
    const cardData = await getCards(CARD_CONFIGS.class_type);
    Card.massAssign(cardData);
    const cardEls = Card.renderAll();
    const cardsContainerEl = document.querySelector('#cards-display');
    cardEls.forEach(el => cardsContainerEl.appendChild(el))
});


// -- HEROS --
async function getHeros() {
    const resp = await fetch(`${BASE_URL}/heros`)
    const json = await resp.json()
    return json
}

// -- CARDS --
async function getCards(className) {
    const resp = await fetch(`${BASE_URL}/cards?class=${className}`)
    const json = await resp.json()
    return json
}

async function updateCardsDisplayed(playerClass, setType, queryObj){
    const playerAttr = playerClass ? {class_type: playerClass} : {class_type: CARD_CONFIGS.class_type};
    const setAttr = setType ? {set_type: setType} : {set_type: CARD_CONFIGS.set_type};
    const new_configs = Object.assign({}, CARD_CONFIGS, playerAttr, setAttr);

    // RE-RENDER NEW CARDS,
    // ONLY WHEN THE FN IS CALLED &
    // THE CARDS LISTED ARE CHANGED
    if (JSON.stringify(CARD_CONFIGS) !== JSON.stringify(new_configs)) {
        let cardData;
        
        
        if (playerClass) {
            cardData = await getCards(new_configs.class_type);
        } else {
            if (new_configs.set_type === 'neutral') {
                cardData = await getCards('Neutral');
            } else {
                cardData = await getCards(new_configs.class_type);
            }
        }

        const cardsContainerEl = document.querySelector('#cards-display');
        cardsContainerEl.innerHTML = "";
        Card.updateList(cardData);
        const cardEls = Card.renderAll();
        cardEls.forEach(el => cardsContainerEl.appendChild(el))

        CARD_CONFIGS = new_configs;
    }
}


// -- DOM EVENTS --
// function switchCardType(e) {
//     if (e.id === 'class-select' && e.classList.contains('inactive')) {
//         makeClassActive()
//         // -- OOP
//         renderCards(activeHero)
//     } else if (e.id === 'neutral-select' && e.classList.contains('inactive')) {
//         makeNeutralActive()
//         // -- OOP
//         renderCards('Neutral')
//     }
// }

// function makeClassActive() {
//     let classBtn = document.querySelector('#class-select')
//     classBtn.classList.remove('inactive')
//     classBtn.classList.add('active')

//     let neutralBtn = document.querySelector('#neutral-select')
//     neutralBtn.classList.remove('active')
//     neutralBtn.classList.add('inactive')
// }

// function makeNeutralActive() {
//     let classBtn = document.querySelector('#class-select')
//     classBtn.classList.remove('active')
//     classBtn.classList.add('inactive')

//     let neutralBtn = document.querySelector('#neutral-select')
//     neutralBtn.classList.remove('inactive')
//     neutralBtn.classList.add('active')
// }