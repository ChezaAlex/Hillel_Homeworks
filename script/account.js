    let logOut = document.getElementById("logOut")
    let deleteAccount = document.querySelector('.deleteAccount')

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

      let createTable = (user) => {
        let shoppingCart = user.shoppingCart;
        let tableBody = document.querySelector('tbody');

        let quantityData = JSON.parse(localStorage.getItem("cartOrder"));
        let quantityMap = new Map(quantityData.map(item => [item.name, item.count]));



        shoppingCart.forEach(item => {
          let tableRow = document.createElement('tr');
          tableRow.innerHTML = `
            <td><img src="img/products/${item.img}.png" style="width: 150px;"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td> <span class="salePercent"> ${item.salePercent ? "-" + item.salePercent : ''}</span></td>
            <td>${quantityMap.get(item.title) || ''}</td>
            <td class="total"></td>
          `;
          let totalCell = tableRow.querySelector('.total');
          totalCell.textContent = !item.sale ? item.price : calculateTotal(tableRow, item, quantityMap.get(item.title)) 
          tableBody.appendChild(tableRow);

        });
      }
      getOrder()

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

    let accountInfo = () =>{
      // let accountUser = document.querySelector('.accountUser')
      let user = JSON.parse(localStorage.getItem("user"))
      let accountName = document.querySelector('#accountName')
      let accountEmail = document.querySelector('#accountEmail')

      accountName.innerHTML = user.name
      accountEmail.innerHTML = user.email

    }
    accountInfo ()


    let changeStatus = async () => {
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
    }


logOut.addEventListener("click", changeStatus);
deleteAccount.addEventListener("click", changeStatus);
