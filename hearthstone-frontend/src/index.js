const BASE_URL = 'http://localhost:3000'
let CARD_CONFIGS = {
    set_type: 'classic',
    class_type: 'Hunter',
    query: {
        name: '',
        rarity: '',
        cost: '',
        race: '',
        type: ''
    }
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


// -- HERO DATA --
async function getHeros() {
    const resp = await fetch(`${BASE_URL}/heros`)
    const json = await resp.json()
    return json
}

// -- CARD DATA --
async function getCards(className) {
    const resp = await fetch(`${BASE_URL}/cards?class=${className}`)
    const json = await resp.json()
    return json
}

// -- CARD RENDERING ALGORITHM --
async function updateCardsDisplayed(playerClass, setType){
    const playerAttr = playerClass ? {class_type: playerClass} : {class_type: CARD_CONFIGS.class_type};
    const setAttr = setType ? {set_type: setType} : {set_type: CARD_CONFIGS.set_type};
    const new_configs = Object.assign({}, CARD_CONFIGS, playerAttr, setAttr);

    let cardData;
    
    const eventTag = event.target.tagName;

    // RE-RENDER NEW CARDS ONLY WHEN CONFIGS CHANGE
    // QUERY CHANGED
    if (eventTag === 'SELECT' || eventTag === 'INPUT'){
        CARD_CONFIGS = new_configs;
        renderCardsWithQuery(CARD_CONFIGS.query);
    } else if (JSON.stringify(CARD_CONFIGS) !== JSON.stringify(new_configs)) {
        // PLAYER CLASS CHANGED
        if (playerClass) {
            cardData = await getCards(new_configs.class_type);
            Card.updateList(cardData);
            renderCards(cardData);

            resetQueryConfig();
        } else {
            // SWTICH BETWEEN NEUTRAL & CLASS CARDS
            if (new_configs.set_type === 'neutral') {
                cardData = await getCards('Neutral');
                Card.updateList(cardData);
                renderCardsWithQuery(CARD_CONFIGS.query)
            } else {
                cardData = await getCards(new_configs.class_type);
                Card.updateList(cardData);
                renderCardsWithQuery(CARD_CONFIGS.query)
            }
            CARD_CONFIGS = new_configs;
        }   
    }
}

// -- CARD RENDERING --
function renderCards() {
    const cardsContainerEl = document.querySelector('#cards-display');
    cardsContainerEl.innerHTML = "";
    const cardEls = Card.renderAll();
    cardEls.forEach(el => cardsContainerEl.appendChild(el))
}

function resetCards(){
    resetQueryConfig();
    renderCards();
}

function renderCardsWithQuery(queryObj) {
    const cardsContainerEl = document.querySelector('#cards-display');
    cardsContainerEl.innerHTML = "";
    const cardEls = Card.renderQuery(queryObj);
    cardEls.forEach(el => cardsContainerEl.appendChild(el))
}

// -- UPDATING CARD CONFIG --
function updateQuery() {
    const updated_hash = {};
    updated_hash[event.target.name] = event.target.value
    CARD_CONFIGS.query = Object.assign({}, CARD_CONFIGS.query, updated_hash)
    updateCardsDisplayed()
}

function resetQueryConfig(){
    // RESET SELECT VALUES
    document.querySelector('#select-rarity').value = "";
    document.querySelector('#select-cost').value = "";
    document.querySelector('#select-race').value = "";
    document.querySelector('#select-type').value = "";

    const emptyQuery = {
        query: {
            name: '',
            rarity: '',
            cost: '',
            race: '',
            type: ''
        }
    }

    CARD_CONFIGS = Object.assign({}, CARD_CONFIGS, emptyQuery)
}