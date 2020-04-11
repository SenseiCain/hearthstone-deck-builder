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
    // Create Heros
    const heroData = await getHeros();
    Hero.massAssign(heroData)
    const heroEls = Hero.renderAll();
    const heroContainerEl = document.querySelector('#heros-section')
    heroEls.forEach(el => heroContainerEl.appendChild(el))

    // Create Cards
    const cardData = await getCards(CARD_CONFIGS.class_type);
    Card.massAssign(cardData);
    const cardEls = Card.renderClass(CARD_CONFIGS.class_type);
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
async function getCards() {
    const resp = await fetch(`${BASE_URL}/cards`)
    const json = await resp.json()
    return json
}

// -- CARD RENDERING ALGORITHM --
async function updateCardsDisplayed(playerClass, setType){
    // TODO - REFACTOR
    // ONLY USED FOR SWITCHING TO CLASSIC
    const playerAttr = playerClass ? {class_type: playerClass} : {class_type: CARD_CONFIGS.class_type};
    const setAttr = setType ? {set_type: setType} : {set_type: CARD_CONFIGS.set_type};
    const new_configs = Object.assign({}, CARD_CONFIGS, playerAttr, setAttr);
    
    // EVENT THAT TRIGGERED FN
    const eventTarget = event.target;
    const eventTag = eventTarget.tagName;
    const eventName = eventTarget.name;
    const eventValue = eventTarget.value;

    if (eventTag === 'SELECT' || eventTag === 'INPUT') {
        // QUERY CHANGED
        CARD_CONFIGS = updateQueryConfig(eventName, eventValue)
        renderCardsWithQuery();
    } else if (CARD_CONFIGS.class_type !== new_configs.class_type) {
        // HERO CHANGED
        CARD_CONFIGS = defaultConfig(new_configs.class_type);
        resetQuerySelectors();
        renderCards();
    } else if (CARD_CONFIGS.set_type !== new_configs.set_type) {
        // SWITCH BETWEEN NEUTRAL & CLASS CARDS
        CARD_CONFIGS = new_configs;
        renderCardsWithQuery(); 
    } else if (eventTag === 'BUTTON') {
        // RESET BUTTON
        CARD_CONFIGS = defaultConfig(new_configs.class_type);
        resetQuerySelectors();
        renderCards();
    }
}

// -- UPDATE CONFIGS --
function defaultConfig(playerClass) {
    const defaultObj = {
        class_type: (playerClass) ? playerClass : CARD_CONFIGS.class_type,
        set_type: 'classic',
        query: {
            name: '',
            rarity: '',
            cost: '',
            race: '',
            type: ''
        }
    }

    return Object.assign({}, defaultObj)
}

function updateQueryConfig(name, value) {
    let newConfigObj = Object.assign({}, CARD_CONFIGS);
    newConfigObj.query[name] = value;
    return Object.assign({}, newConfigObj);
}

// -- CARD RENDERING --
function renderCards() {
    const cardsContainerEl = document.querySelector('#cards-display');
    cardsContainerEl.innerHTML = "";
    const cardEls = Card.renderClass(CARD_CONFIGS.class_type);
    cardEls.forEach(el => cardsContainerEl.appendChild(el))
}

function renderCardsWithQuery() {
    const cardsContainerEl = document.querySelector('#cards-display');
    cardsContainerEl.innerHTML = "";
    const cardEls = Card.renderQuery(CARD_CONFIGS);
    cardEls.forEach(el => cardsContainerEl.appendChild(el))
}

// -- RESET SELECT VALUES --
function resetQuerySelectors() {
    document.querySelector('#select-rarity').value = "";
    document.querySelector('#select-cost').value = "";
    document.querySelector('#select-race').value = "";
    document.querySelector('#select-type').value = "";
}