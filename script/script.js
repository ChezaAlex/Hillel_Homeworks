const vegetables = [
    {
        name: `tomato`,
        icon: `🍅`,
        price: 2.3
    },
    {
        name: `carrot`,
        icon: `🥕`,
        price: 1.5
    },
    {
        name: `corn`,
        icon: `🌽`,
        price: 2.78,
        season: true
    }
];


class Vegetable {
    constructor(obj){
        this.type = `Vegetable`;
        this.seasonKoef = 1.3;
        this.name = obj.name;
        this.icon = obj.icon;
        this.season = obj.season;
        if(obj.season == true){
            this.price = obj.price*this.seasonKoef;
        }else{
            this.price = obj.price
        }
}
    getInf(){
        if(this.season == undefined){
            document.write(`<li><ul>Type: ${this.type}</ul><ul>SeasonKoef: ${this.seasonKoef}</ul><ul>Name: ${this.name}</ul>
            <ul>Icon: ${this.icon}</ul><ul>Price: ${this.price}</ul></li>`)  
        }else{
        document.write(`<li><ul>Type: ${this.type}</ul><ul>SeasonKoef: ${this.seasonKoef}</ul><ul>Name: ${this.name}</ul>
            <ul>Icon: ${this.icon}</ul><ul>Price: ${this.price}</ul><ul>Season: ${this.season}</ul></li>`)} 
        }
}


let obj2 = vegetables.map(el => new Vegetable({...el})).map(e => {e.getInf()});



