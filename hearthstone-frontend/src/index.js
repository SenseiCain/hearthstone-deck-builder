const BASE_URL = 'http://localhost:3000'
let DECK = new Deck;

let CARD_CONFIGS = {
    set_type: 'Classic',
    class_type: 'Hunter',
    query: {
        search_field: '',
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
    resetDeckTitle();
    

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
// Main callback for rendering. Updates gloabl card_config,
// queries cards based on config, then renders resulting cards.
async function updateCardsDisplayed(playerClass, setType){
    
    // EVENT THAT TRIGGERED FN
    const eventTarget = event.target;
    const eventTag = eventTarget.tagName;
    const eventName = eventTarget.name;
    const eventValue = eventTarget.value;

    if (eventTag === 'SELECT' || eventTag === 'INPUT') {
        // QUERY CHANGED
        CARD_CONFIGS = updateQueryConfig(eventName, eventValue)
        renderCardsWithQuery();
    } else if (playerClass && CARD_CONFIGS.class_type !== playerClass) {
        // HERO CHANGED
        CARD_CONFIGS = defaultConfig(playerClass);
        resetDeckTitle();
        resetQuerySelectors();
        renderCards();
    } else if (setType && CARD_CONFIGS.set_type !== setType) {
        // SWITCH BETWEEN NEUTRAL & CLASS CARDS
        CARD_CONFIGS = changeSetConfig(setType);
        renderCardsWithQuery(); 
    } else if (eventTag === 'BUTTON') {
        // RESET BUTTON
        CARD_CONFIGS = defaultConfig();
        resetQuerySelectors();
        renderCards();
    }
}

// -- UPDATE CONFIGS --
function defaultConfig(playerClass) {
    const defaultObj = {
        class_type: (playerClass) ? playerClass : CARD_CONFIGS.class_type,
        set_type: 'Classic',
        query: {
            search_field: '',
            name: '',
            rarity: '',
            cost: '',
            race: '',
            type: ''
        }
    }

    return Object.assign({}, defaultObj)
}

function changeSetConfig(setType) {
    let newConfigObj = Object.assign({}, CARD_CONFIGS);
    newConfigObj.set_type = setType;
    return Object.assign({}, newConfigObj);
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
    document.querySelector('#search_field').value = "";
    document.querySelector('#select-rarity').value = "";
    document.querySelector('#select-cost').value = "";
    document.querySelector('#select-race').value = "";
    document.querySelector('#select-type').value = "";
}


// -- DECK FUNCTIONS --
function resetDeckTitle() {
    const deckTitleEL = document.querySelector('#deck-class h3')
    deckTitleEL.innerText = CARD_CONFIGS.class_type;
    const deckImageEl = document.querySelector('#deck-class img');
    const cardId = Hero.cardIdByName(CARD_CONFIGS.class_type);
    deckImageEl.src = `https://art.hearthstonejson.com/v1/tiles/${cardId}.png`;
}

function addCardToDeck(card){
    let resp = DECK.addCard(card);

    if(resp.status) {
        if (resp.amount === 1 && !resp.isLegendary) {
            const cardCountEl = document.querySelector(`#deck_${card.card_id} .card-count`)
            cardCountEl.innerText = '2'
        } else {
            const deckContainerEl = document.querySelector('#deck-cards')

            const cardContainerEl = document.createElement('div');
            cardContainerEl.id = `deck_${card.card_id}`;
            cardContainerEl.classList.add('col-12', 'd-flex', 'px-0', 'border-bottom', 'border-white');

            const cardManaEl = document.createElement('div');
            cardManaEl.classList.add('bg-info', 'col-1', 'p-0', 'text-center', 'text-white');
            cardManaEl.innerText = card.cost;

            const cardInfoEl = document.createElement('div');
            cardInfoEl.classList.add('col-10', 'bg-dark', 'text-white', 'pl-1', 'font-weight-light');
            cardInfoEl.innerText = card.name;

            const cardCountEl = document.createElement('div');
            cardCountEl.classList.add('col-1', 'bg-dark', 'p-0', 'text-center', 'text-info', 'card-count');

            if (resp.isLegendary) {
                cardCountEl.innerText = "\u2605"
            }

            cardContainerEl.appendChild(cardManaEl);
            cardContainerEl.appendChild(cardInfoEl)
            cardContainerEl.appendChild(cardCountEl)
            deckContainerEl.appendChild(cardContainerEl);
        }
    }
}