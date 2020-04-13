let ALL_HEROS = []

class Hero {
    constructor(obj){
        this.id = obj.id;
        this.card_id = obj.card_id;
        this.dbf_id = obj.dbf_id;
        this.name = obj.name;
        this.player_class = obj.player_class;
        this.img = obj.img;

        ALL_HEROS.push(this)
    }

    static massAssign(objArray){
        objArray.forEach(obj => {
            new this(obj);
        })
    }

    get all() {
        return ALL_HEROS
    }

    static cardIdByName(queryName) {
        let result;

        ALL_HEROS.forEach(el => {
            if (el.player_class == queryName) {
                result = el;
            }
        })
        
        return result.card_id;
    }

    static renderAll(){
        let result = [];

        ALL_HEROS.forEach(obj => {
            const btn = document.createElement('button');
            btn.innerText = obj.player_class;
            btn.id = `btn-${obj.player_class.replace(/\s+/g, '-').toLowerCase()}`;
            btn.addEventListener('click', e => {
                updateCardsDisplayed(obj.player_class, 'classic')
            });

            result.push(btn)
        })

        return result;
    }


}