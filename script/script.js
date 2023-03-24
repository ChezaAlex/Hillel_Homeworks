    let orders = document.querySelector('#orders')
    let form = document.querySelector('form')
    let userName = document.querySelector('#name')
    let warning = document.querySelector('p');
    let size = document.querySelector('#size')
    let text = document.querySelector('textarea')



    form.addEventListener('submit', (event) => {
      let randomValue = Math.floor(Math.random() * 15)

      let div = document.createElement('div')
      let stuffing = document.querySelector('input[name = "stuffing"]:checked')
      let topping = [...document.querySelectorAll('input[name = "topping"]:checked')]

      const userForm = {}
      event.preventDefault()


      if(userForm.value == undefined){
        div.innerHTML = "Заполните все поля!!!"
        orders.insertAdjacentElement('beforeend', div);
      }

      userForm.name = userName.value
      userForm.staffing = stuffing.value
      userForm.topping = topping.map(el => {
            if(el.checked)
              return el.value
          })
      userForm.size = size.value
      userForm.text = text.value

      console.log(userForm)

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
      let burgerPrize = ham().calculatePrice()
      let calories = ham().calculateCal()
      function ham(){
        let hamburger
        if(userForm.size == 'Big'){
            if(userForm.staffing == 'Cheese'){
               let hamburger = new Hamburger(Hamburger.SIZE_BIG, Hamburger.STUFFING_CHEESE);
                    if(userForm.topping.length == 1){
                        if(userForm.topping[0] == 'Sauce'){
                            hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                            return hamburger
                          }else if(userForm.topping[0] == 'Mayonez'){
                            hamburger.addTopping(Hamburger.TOPPING_MAYO);
                            return hamburger
                          }
                          }else if(userForm.topping.length == 2){
                            hamburger.addTopping(Hamburger.TOPPING_MAYO)
                            hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                            return hamburger
                          }
                    return hamburger
            }else if(userForm.staffing == 'Salad'){
                let hamburger = new Hamburger(Hamburger.SIZE_BIG, Hamburger.STUFFING_SALAD);
                      if(userForm.topping.length == 1){
                        if(userForm.topping[0] == 'Sauce'){
                            hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                            return hamburger
                          }else if(userForm.topping[0] == 'Mayonez'){
                            hamburger.addTopping(Hamburger.TOPPING_MAYO);
                            return hamburger
                          }
                          }else if(userForm.topping.length == 2){
                            hamburger.addTopping(Hamburger.TOPPING_MAYO)
                            hamburger.addTopping(Hamburger.TOPPING_SAUCE)
                            return hamburger
                          }
                    return hamburger
            }else if(userForm.staffing == 'Potato'){
               let hamburger = new Hamburger(Hamburger.SIZE_BIG, Hamburger.STUFFING_POTATO);
                        if(userForm.topping.length == 1){
                          if(userForm.topping[0] == 'Sauce'){
                              hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                              return hamburger
                            }else if(userForm.topping[0] == 'Mayonez'){
                              hamburger.addTopping(Hamburger.TOPPING_MAYO);
                              return hamburger
                            }
                            }else if(userForm.topping.length == 2){
                              hamburger.addTopping(Hamburger.TOPPING_MAYO)
                              hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                              return hamburger
                            }
                    return hamburger
            }
        }else if(userForm.size == 'Small'){
            if(userForm.staffing == 'Cheese'){
               let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
                    if(userForm.topping.length == 1){
                      if(userForm.topping[0] == 'Sauce'){
                        hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                        return hamburger
                      }else if(userForm.topping[0] == 'Mayonez'){
                        hamburger.addTopping(Hamburger.TOPPING_MAYO);
                        return hamburger
                      }
                      }else if(userForm.topping.length == 2){
                            hamburger.addTopping(Hamburger.TOPPING_MAYO)
                            hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                            return hamburger
                      }
                return hamburger
            }else if(userForm.staffing == 'Salad'){
               let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
                    if(userForm.topping.length == 1){
                      if(userForm.topping[0] == 'Sauce'){
                          hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                          return hamburger
                        }else if(userForm.topping[0] == 'Mayonez'){
                          hamburger.addTopping(Hamburger.TOPPING_MAYO);
                          return hamburger
                        }
                        }else if(userForm.topping.length == 2){
                              hamburger.addTopping(Hamburger.TOPPING_MAYO)
                              hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                              return hamburger
                        }
                return hamburger
            }else if(userForm.staffing == 'Potato'){
              let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
                    if(userForm.topping.length == 1){
                      if(userForm.topping[0] == 'Sauce'){
                          hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                          return hamburger
                        }else if(userForm.topping[0] == 'Mayonez'){
                          hamburger.addTopping(Hamburger.TOPPING_MAYO);
                          return hamburger
                        }
                        }else if(userForm.topping.length == 2){
                              hamburger.addTopping(Hamburger.TOPPING_MAYO)
                              hamburger.addTopping(Hamburger.TOPPING_SAUCE);
                              return hamburger
                        }
                  return hamburger
            }
        }
      }


      div.innerHTML = `Привет: ${userForm.name} <br> Ваш заказ ${userForm.size} бургер с ${userForm.staffing} и ${userForm.topping} будет готов в течении ${randomValue} минут
      Стоимость заказа: ${burgerPrize} гривен <br>
      Каллорий:  ${calories}`
      orders.insertAdjacentElement('beforeend', div);

        event.target.reset();
    })

