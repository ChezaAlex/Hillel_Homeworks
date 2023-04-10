let form = document.querySelector('form')
let jokesWrap = document.querySelector('#jokesWrap')
let favorite = document.querySelector('aside')
let searchFrom = document.querySelector('#searchFrom')
const currentDate = new Date();

function dateDifrence(date, currentDate){
date.slice(0,19)
const hollowDate = new Date(date);
const differenceInMilliseconds = currentDate.getTime() - hollowDate.getTime();
let differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
let stringDiffrence = differenceInDays.toString().slice(0,4)
return `Last update:${stringDiffrence} days ago`
}

searchFrom.addEventListener('click', function(){
  let searchTypes = document.querySelector('#searchTypes')
  searchTypes.classList.toggle('open')
})

let getStore = () => JSON.parse(localStorage.getItem('favorite')) ?? []

let getRandom = () =>
    fetch('https://api.chucknorris.io/jokes/random')

let getCategories = (category) =>
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)

let getSearch = (word) =>
    fetch(`https://api.chucknorris.io/jokes/search?query=${word}`)

let addFavorite = (joke, store) =>{
  store.push({...joke, like:true})
  localStorage.setItem('favorite', JSON.stringify(store))
  render({...joke, like:true})
}

let removeFavorite = (joke, store) =>{
  let updatedStore = store.filter(el => el.id !== joke.id)
  localStorage.setItem('favorite', JSON.stringify(updatedStore))

  favorite.querySelector(`div[data-id=${joke.id}]`).remove()
  let img = jokesWrap.querySelector(`p[data-id=${joke.id}] img`)
  img.src = './img/Vector.svg'

}

let markIfFavorite = (joke, img) => {
  let store = getStore()
  store.findIndex(el => el.id === joke.id) >= 0 && (img.src = './img/heart.svg')
}

let clickHeart = (joke) =>{
  let img = document.querySelector(`p[data-id=${joke.id}] img`) ?? ('p img')
  let store = getStore()

  if(img.src.includes('heart')){
      img.src = './img/Vector.svg'
      removeFavorite(joke, store)

  }else{
      img.src = './img/heart.svg'
      addFavorite(joke, store)
  }
}



let render = (joke) => {
      let div = document.createElement('div')
      let p = document.createElement('p')
      let img = document.createElement('img')
      let cat = document.createElement('div')
      let imgMess = document.createElement('img')
      let pDate = document.createElement('p')
      let pId = document.createElement('p')

      p.innerHTML = joke.value
      p.dataset.id = joke.id
      pDate.innerHTML = dateDifrence(joke.updated_at, currentDate)
      pDate.className += 'pDate'
      pId.innerHTML = `ID:${joke.id}`
      pId.className += "pId"
      cat.innerHTML = joke.categories
      cat.className += "categories"
      div.className += "joke"
      div.dataset.id = joke.id
      imgMess.src = './img/message.svg'

      img.src = './img/Vector.svg'
      img.className = 'heartImg'
      imgMess.className = 'imgMess'

      div.append(pId)
      div.append(p)
      div.append(pDate)
      div.append(imgMess)
      if(joke.categories.length == 1){div.append(cat)}

    
      img.addEventListener('click', () => clickHeart(joke))
      p.append(img)
      if(joke.like){
        favorite.append(div)
        div.append(p)
        div.append(pDate)
        img.src = './img/heart.svg'
      }else{
        markIfFavorite(joke, img)
        jokesWrap.append(div)
        div.append(p)
        div.append(pDate)

      }
}

form.addEventListener('submit', (event) => {
let searchCategotries = document.querySelector('input[name = "searchCategotries"]:checked').value
let searchTypes = document.querySelector('input[name = "searchTypes"]:checked')
let searchText = document.querySelector('#searchText').value
event.preventDefault()
  if(searchCategotries == 'random'){
      getRandom()
      .then((response) => response.json())
      .then(res => render(res))
  }else if(searchCategotries == 'categories'){  
      getCategories(searchTypes.value)
      .then((response) => response.json())
      .then(res => render(res))
 }else{
      getSearch(searchText)
      .then((response) => response.json())
      .then(response => response.result.forEach(joke=>render(joke)))
  }
})

let renderFavorite = () => {
  let store = getStore()
  store.forEach( joke => render(joke))
}

renderFavorite()

document.addEventListener('DOMContentLoaded', function(){
  let favBtn = document.querySelector('#favBtn')
  favBtn.addEventListener('click', function(){
    favorite.classList.toggle('open')
    favBtn.classList.toggle('open')
  })
})
