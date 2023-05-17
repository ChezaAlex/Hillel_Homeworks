    let category = document.querySelectorAll('.category')
    ///Кнопки в хедере
    let signIn = document.getElementById("signIn")
    let logOut = document.getElementById("logOut")
    let cartLink = document.getElementById('cartLink')
    ////////////

    let getProducts = async() =>{
        let result = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/products`,{
        method: 'GET',
        headers:{
          "Content-type": "application/json",
        }
      }).then(res=>res.json())
        result.forEach(e => {createCards(e, e.category, e.img,e.sale, e.salePercent)})

    }
    getProducts()

    let createCards = (product, category, image, sale, salePercent) =>{
      let productCard = document.createElement('div')
      productCard.className = `productCard`
      let categoryContainer = document.querySelector(`[data-name="${category}"] .category__container`);
      let user = JSON.parse(localStorage.getItem("user"))
        productCard.innerHTML += `
            <img src="img/products/${image}.png" style="width: 150px;">
            <p>${product.title}</p>
            <button class ="buttonCart">
            <img src="img/shopping-cart.png">
            </button>
            `;    
        if(!sale){getPrice(product, productCard)}else{salePrice(salePercent, product, productCard)}
        categoryContainer.append(productCard); 
        if(user){
          signIn.innerHTML = `Hi|${user.name}`;
          logOut.innerHTML = "Log Out";
          cartLink.href = "shoppingCart.html"
        }
        cartBtn(productCard, user, product, user)
    }
    /////Функция деавторизации пользователя
    logOut.addEventListener("click", async () => {
          let userId = JSON.parse(localStorage.getItem("user")).id;
          await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: false }),
          });
          localStorage.removeItem("user");
          window.location.href = "index.html";
    });

    //ФУНКЦИЯ ДЛЯ РАССЧЕТА СКИДКИ И ЗАПИСИ ЕЕ В КАРТУ
    let salePrice = (salePercent, product, productCard) =>{
        let oldPrice = document.createElement('del');
        oldPrice.innerText = product.price;

        let newPrice = Math.round(product.price * (1 - salePercent / 100));

        let newPriceElement = document.createElement('span');
        newPriceElement.className = "price"
        newPriceElement.innerText = newPrice;
        productCard.appendChild(oldPrice);
        productCard.appendChild(newPriceElement);
    }
    let getPrice = (product, productCard) =>{
        let priceElement = document.createElement('span');
        priceElement.className = "price"
        priceElement.innerText = product.price;
        productCard.appendChild(priceElement);
    }
    ////////////////////////////////////////////////////////////////
    //ФУНКЦИЯ ДЛЯ СМЕНА ЦВЕТА КНОПКИ, ДОБАВЛЕНИЯ - УДАЛЕНИЯ ТОВАРА В ЛОКАЛ, СЧЕТЧИКА
    let counters = {}
    let cartBtn = (productCard, user, product, userId) =>{
      let buttonCart = productCard.querySelector('.buttonCart');
      counters[product.id] = 0;
      if(user){
        buttonCart.addEventListener('click', () => {

          counters[product.id]++;

                if (counters[product.id] % 2 === 1) {
                  buttonCart.style.backgroundColor = 'red';
                  addToShoppingCart(product,userId)
                }else{
                  buttonCart.style.backgroundColor = 'green';}
                  removeFromShoppingCart(product,userId)
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = cart.findIndex(item => item.id === product.id); 
                if (index === -1) {
                  cart.push(product);
                } else { 
                  cart.splice(index, 1);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount(cart);
        })
        }else{
          buttonCart.addEventListener('click', function(){
          window.location.href = "login.html"
        })
      }
    }
    //////ФУНКЦИЯ ДЛЯ СЧЕТЧИКА КОРЗИНЫ
    let updateCartCount = (cart) => {
      let count = cart ? cart.length : 0;
      document.getElementById("cartCount").innerText = count;
    };

    //////////////////////////////////////////////////////////////////////
    let addToShoppingCart = async (product, userId) => {
      userId = userId.id
      let user = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`)
        .then(response => response.json());
      if (!user.shoppingCart) {
        user.shoppingCart = [];
      }
      user.shoppingCart.push(product);
      await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    }
    let removeFromShoppingCart = async (product, userId) => {
      userId = userId.id
      console.log(product)
      let user = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`)
        .then(response => response.json());
      if (user.shoppingCart) {
        let index = user.shoppingCart.findIndex(item => item.id === product.id);
        console.log(index)
        if (index !== -1) {
          user.shoppingCart.splice(index, 1);
          await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
        }
      }
    }

