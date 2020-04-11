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

    static updateList(objArray){
        ALL_CARDS = [];
        objArray.forEach(obj => {
            new this(obj);
        })
    }

    // query: {
    //     name: '',
    //     rarity: '',
    //     cost: '',
    //     race: '',
    //     type: ''
    // }

    static renderQuery(queryObj) {
        let result = [];

        const queryArray = ALL_CARDS.filter(el => {
            console.log(el.card_type, queryObj.type)
            return (queryObj.type) ? (el.card_type == queryObj.type) : true;
        })

        queryArray.forEach(obj => {
            const divEl = document.createElement('div')
            divEl.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3')
            
            const imgEl = document.createElement('img')
            imgEl.src = obj.img
            divEl.appendChild(imgEl)

            result.push(divEl);
        })

        return result;
    }

    static renderAll(){
        let result = [];

        ALL_CARDS.forEach(obj => {
            const divEl = document.createElement('div')
            divEl.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-3')
            
            const imgEl = document.createElement('img')
            imgEl.src = obj.img
            divEl.appendChild(imgEl)

            result.push(divEl);
        })

        return result;
    }

    get all(){
        return ALL_CARDS;
    }
}