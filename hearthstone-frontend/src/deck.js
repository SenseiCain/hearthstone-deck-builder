let DECK_CARDS = []

class Deck {
    constructor() {

    }

    get cards() {
        return DECK_CARDS;
    }

    addCard(card) {
        let count = 0;
        let result = false;
        let legendary = false;

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
        }

        return { status: result, amount: count, isLegendary: legendary };
    }
}