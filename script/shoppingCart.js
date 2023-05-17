let orderField = document.querySelector('.orderSum')
let logOut = document.getElementById("logOut")
let getOrder = async() => {
  let userId = JSON.parse(localStorage.getItem("user")).id;
  let user = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`,{
    method: 'GET',
    headers:{
      "Content-type": "application/json",
    }
  }).then(res => res.json());
  createTable(user);
}
getOrder()
let createTable = (user) => {
  let shoppingCart = user.shoppingCart;
  let tableBody = document.querySelector('tbody');
  shoppingCart.forEach(item => {
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td><img src="img/products/${item.img}.png" style="width: 150px;"></td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td> <span class="salePercent"> ${item.salePercent ? "-" + item.salePercent : ''}</span></td>
      <td><input type="number" class="quantity" value ="1"></input></td>
      <td class ="total"></td>
      <td><button class="delete" data-id="${item.id}">Delete</button></td>
    `;
    tableBody.appendChild(tableRow);

    let deleteBtn = tableRow.querySelector('.delete')
    let input = tableRow.querySelector('.quantity');
    let totalCell = tableRow.querySelector('.total');
    let accountPath = document.querySelector('.accountPath')
    
    totalCell.textContent = !item.sale ? item.price : calculateTotal(tableRow, item, input.value) 
    
    input.addEventListener('input', () => {
      calculateTotal(tableRow, item, input.value);
      calculateSum();
    });
    accountPath.addEventListener('click', () => {
      addQuantity(item, input.value);
    });
    calculateSum();
    deleteBtn.addEventListener('click', deleteGods);

  });
}
let updateCartCount = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart ? cart.length : 0;
  document.getElementById("cartCount").innerText = count;
};

let userChecked = () =>{
  let user = JSON.parse(localStorage.getItem("user"))
  let cartLink = document.getElementById('cartLink')
  if(user){
    signIn.innerHTML = `Hi|${user.name}`;
    logOut.innerHTML = "Log Out";
    cartLink.href = "shoppingCart.html"
  }
  updateCartCount();
}
userChecked()
let removeFromShoppingCart = async (product) => {
  let userId = JSON.parse(localStorage.getItem("user")).id;

  let user = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`)
    .then(response => response.json());
  if (user.shoppingCart) {
    
    let index = user.shoppingCart.findIndex(item => item.id === product);
    
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

userChecked()
 let calculateTotal = (tableRow, item, quantity) => {
    let totalCell = tableRow.querySelector('.total');
    let total
    if (!item.sale){
      total = quantity*item.price
    }else{
      total = quantity*(item.price - (item.price/100*item.salePercent));
    }
    totalCell.textContent = total;
    return total
  }
  
  let calculateSum = () => {
    let sumOrder = document.querySelector('#sumOrder')
    let totalCells = document.querySelectorAll('.total');
    let sum = 0;
    totalCells.forEach(cell => {
      sum += parseFloat(cell.textContent);
    });
    sumOrder.textContent = sum;
  }
  
  let deleteGods = (event) => {
    let button = event.target;
    let tableRow = button.closest('tr');
    let productId = button.getAttribute('data-id');
    let userId = JSON.parse(localStorage.getItem("user")).id;
  
    let cart = JSON.parse(localStorage.getItem('cart'));
    let updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    tableRow.remove();
    calculateSum();
    removeFromShoppingCart(productId)
  }
let addQuantity = (item, quantity) =>{
  let cartOrder = JSON.parse(localStorage.getItem("cartOrder")) || [];
  let newProduct = {
    name: item.title,
    count: quantity
  };
  cartOrder.push(newProduct);
  localStorage.setItem("cartOrder", JSON.stringify(cartOrder));
}
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

