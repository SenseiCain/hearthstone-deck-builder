let ALL_CARDS = [];

class Card {
    constructor(obj){
        this.card_id = obj.card_id;
        this.dbf_id = obj.dbf_id;
        this.name = obj.name;
        this.card_set = obj.card_set;
        this.card_type = obj.card_type;
        this.rarity = obj.rarity;
        this.cost = obj.cost;
        this.player_class = obj.player_class;
        this.img = obj.img;
        this.mechanics = obj.mechanics;

        ALL_CARDS.push(this)
    }

    static massAssign(objArray){
        objArray.forEach(obj => {
            new this(obj);
        })
    }

    get all(){
        return ALL_CARDS;
    }
}