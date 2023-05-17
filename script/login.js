// /LOGIN

const formSignIn = document.getElementById('formSignIn');
const errorDiv = document.querySelector('.error');
errorDiv.className = `classError`
formSignIn.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  fetch('https://634e9f834af5fdff3a625f84.mockapi.io/users')
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.email === email);
      if (!user) {
        errorDiv.textContent = 'Invalid email';
        errorDiv.style.display = 'block';
      } else if (user.password !== password) {
        errorDiv.textContent = 'Invalid password';
        errorDiv.style.display = 'block';
      } else {
        fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: true })
        })
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch(error => console.error(error));
        logJSONData(user.id)
      }
    })
    .catch(error => console.error(error));
});

let logJSONData = async (userId) =>{
  let response = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`);
  let userObj = await response.json();
  localStorage.setItem("user", JSON.stringify(userObj));
}

//Registration

// const formRegistration = document.getElementById('formRegistration');
// const errorRegistration = formRegistration.querySelector('.errorReg');
// errorRegistration.className = `classError`
//   formRegistration.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const name = formRegistration.name.value.trim();
//     const email = formRegistration.email.value.trim();
//     const password = formRegistration.password.value.trim();
//     const verifyPassword = formRegistration.verifyPassword.value.trim();

//     if (password !== verifyPassword) {
//       errorRegistration.innerText = 'Password not matches!';
//       errorRegistration.style.display = 'block';
//       return;
//     }

//     fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users?email=${email}`)
//       .then(response => response.json())
//       .then(users => {
//         if (users.length > 0) {
//           errorRegistration.innerText = 'User with email ' + email + ' already exists!';
//           errorRegistration.style.display = 'block';
//           return;
//         }

//         fetch('https://634e9f834af5fdff3a625f84.mockapi.io/users', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             name,
//             email,
//             password,
//             status: true,
//             orders: [],
//             shoppingCart: []
//           })
//         })
//         .then(() => {
//           window.location.href = 'index.html';
//         })
//         .catch(() => {
//           errorRegistration.innerText = 'Error creating user.';
//           errorRegistration.style.display = 'block';
//         });
//       })
//       .catch(() => {
//         errorRegistration.innerText = 'Error checking email.';
//         errorRegistration.style.display = 'block';
//       });
//       logJSONData(user.id)
//   });
const formRegistration = document.getElementById('formRegistration');
const errorRegistration = formRegistration.querySelector('.errorReg');

formRegistration.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = formRegistration.name.value.trim();
  const email = formRegistration.email.value.trim();
  const password = formRegistration.password.value.trim();
  const verifyPassword = formRegistration.verifyPassword.value.trim();

  if (password !== verifyPassword) {
    errorRegistration.innerText = 'Пароль не совпадает!';
    errorRegistration.style.display = 'block';
    return;
  }

  fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users?email=${email}`)
    .then(response => response.json())
    .then(users => {
      if (users.length > 0) {
        errorRegistration.innerText = 'Пользователь с адресом электронной почты ' + email + ' уже существует!';
        errorRegistration.style.display = 'block';
        return;
      }

      fetch('https://634e9f834af5fdff3a625f84.mockapi.io/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          status: true,
          orders: [],
          shoppingCart: []
        })
      })
        .then(response => response.json())
        .then(user => {
          // Сохранить информацию о пользователе в localStorage
          localStorage.setItem('user', JSON.stringify(user));
          // Выполнить автоматическую аутентификацию или перенаправление на страницу аутентификации
          window.location.href = 'index.html';
        })
        .catch(() => {
          errorRegistration.innerText = 'Ошибка при создании пользователя.';
          errorRegistration.style.display = 'block';
        });
    })
    .catch(() => {
      errorRegistration.innerText = 'Ошибка при проверке адреса электронной почты.';
      errorRegistration.style.display = 'block';
    });
});