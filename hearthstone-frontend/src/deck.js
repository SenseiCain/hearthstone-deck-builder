let DECK_CARDS = []

class Deck {
    constructor() {

    }

    get cards() {
        return DECK_CARDS;
    }

    clear() {
        DECK_CARDS = [];
    }

    addCard(card) {
        let count = 0;
        let result = false;
        let legendary = false;
        let card_count;

        if (DECK_CARDS.length < 30) {
            
            DECK_CARDS.forEach(el => {
                if (el === card) {
                    count ++;
                }
            })

            if (card.rarity === 'Legendary') {
                if (count < 1) {
                    DECK_CARDS.push(card);
                    result = true;
                }
                
                legendary = true;
            } else if (count < 2) {
                DECK_CARDS.push(card);
                result = true;
            }

            card_count = DECK_CARDS.length;
        }

        return { status: result, amount: count, isLegendary: legendary, total: card_count };
    }

    removeCard(cardId) {
        const card = DECK_CARDS.find(el => el.card_id === cardId);
        let count = 0;
        let result = false;
        let card_count;

        if (DECK_CARDS.includes(card)) {
            DECK_CARDS.splice(DECK_CARDS.indexOf(card), 1);
            count = DECK_CARDS.filter(el => el.card_id == card.card_id).length;
            result = true;
        }

        card_count = DECK_CARDS.length;
        
        return { status: result, amount: count, total: card_count}
        
    }
}