let ALL_CARDS = [];

class Card {
    constructor(obj){
        this.card_id = obj.card_id;
        this.dbf_id = obj.dbf_id;
        this.name = obj.name;
        this.card_set = obj.card_set;
        this.card_type = obj.card_type;
        this.rarity = obj.rarity;
        this.race = obj.race;
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

    static updateList(objArray){
        ALL_CARDS = [];
        objArray.forEach(obj => {
            new this(obj);
        })
    }

    static renderQuery(queryObj) {
        let result = [];

        // TODO - REFACTOR
        const queryArray = ALL_CARDS.filter(el => {
            if (((queryObj.type) ? (el.card_type === queryObj.type) : true)
                && ((queryObj.rarity) ? (el.rarity === queryObj.rarity) : true)
                && ((queryObj.cost && queryObj.cost < 7) ? (el.cost == queryObj.cost) : true)
                && ((queryObj.cost && queryObj.cost >= 7) ? (el.cost >= 7) : true)
                && ((queryObj.race) ? (el.race === queryObj.race) : true)){
                return true;
            }
        })

        queryArray.forEach(obj => {
            result.push(this.render(obj));
        })

        return result;
    }

    static renderAll(){
        let result = [];

        ALL_CARDS.forEach(obj => {
            result.push(this.render(obj));
        })

        return result;
    }

    static render(obj) {
        const divEl = document.createElement('div')
        divEl.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3')
        
        const imgEl = document.createElement('img')
        imgEl.src = obj.img
        divEl.appendChild(imgEl)

        return divEl;
    }

    get all(){
        return ALL_CARDS;
    }
}