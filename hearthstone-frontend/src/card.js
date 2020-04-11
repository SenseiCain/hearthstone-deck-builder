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

    static renderQuery(queryObj) {
        let queryArray = [];
        let result = [];

        // TODO - REFACTOR
        ALL_CARDS.forEach(el => {

            if (
                ((queryObj.set_type === 'Neutral') ? el.player_class === 'Neutral' : el.player_class === queryObj.class_type)
                && ((queryObj.query.rarity) ? el.rarity == queryObj.query.rarity : true)
                && ((queryObj.query.cost && queryObj.query.cost < 7) ? el.cost == queryObj.query.cost : true)
                && ((queryObj.query.cost && queryObj.query.cost >= 7) ? el.cost >= 7 : true)
                && ((queryObj.query.race) ? el.race == queryObj.query.race : true)
                && ((queryObj.query.type) ? el.card_type == queryObj.query.type : true)
            ){
                queryArray.push(el)
            }

        })

        queryArray.forEach(obj => {
            result.push(this.render(obj));
        })

        return result;
    }

    static renderClass(classType){
        let result = [];

        ALL_CARDS.forEach(obj => {
            if (obj.player_class == classType) {
                result.push(this.render(obj));
            }
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