class Hamburger{
  constructor(size, stuffing){
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = []
  }
  static get SIZE_SMALL(){return{ size:'small', price: 50, calories: 20}}
  static get SIZE_BIG(){return{ size:'big', price: 100, calories: 40}}
  static get STUFFING_CHEESE(){return{ name: 'cheese', price: 10, calories: 20}}
  static get STUFFING_SALAD(){return{ name: 'salad', price: 20, calories: 5}}
  static get STUFFING_POTATO(){return{ name: 'potato', price: 15, calories: 10}}
  static get TOPPING_SAUCE() {return { name: 'sauce', price: 15, calories: 0 }}
  static get TOPPING_MAYO() {return { name: 'mayo', price: 20, calories: 5 }}

  addTopping(topping){
    return this.toppings.push(topping)
  }
  calculatePrice(){
      const toppingPrice = this.toppings.reduce((total, topping) => total + topping.price, 0);
      return this.size.price + this.stuffing.price + toppingPrice;
  }
  calculateCal(){
      const toppingCal= this.toppings.reduce((total, topping) => total + topping.calories, 0)
      return this.size.calories + this.stuffing.calories + toppingCal;
  }
}

const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
console.log('Calories:', hamburger.calculateCal());