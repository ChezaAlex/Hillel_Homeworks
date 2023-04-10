const BASE_URL = 'https://api.chucknorris.io/jokes/'

let form = document.querySelector('form')
let content = document.querySelector('#content')
let favorite = document.querySelector('#favorite')

let addFavorite = () => {

}

let removeFavorite = () => {

}

let getStore = () => JSON.parse(localStorage.getItem('favorite')) ?? []

let clickHeart = (joke) => {
    let img = document.querySelector(`p[data-id=${joke.id}] img`)

    if(img.src.includes('heart')){

        img.src = './images/Vector.svg'
        removeFavorite()

    }else{

        img.src = './images/heart.svg'
        addFavorite()
    }


    let store = getStore()
    store.push({...joke, like: true })

    localStorage.setItem('favorite', JSON.stringify(store))

    render({...joke, like: true})
}

let markIfFavorite = (joke, img) => {
    let store = getStore()
    store.findIndex(el => el.id === joke.id) >= 0 && (img.src = './images/heart.svg')

}

let render = (joke) => {

    let p = document.createElement('p')
    let img = document.createElement('img')
    p.innerHTML = joke.value
    p.dataset.id = joke.id
    img.src = './images/Vector.svg'

    img.addEventListener('click', () => clickHeart(joke))
    p.append(img)

    if(joke.like){
        favorite.append(p)
        img.src = './images/heart.svg'

    }else{
        markIfFavorite(joke, img)
        content.append(p)
    }

}

form.addEventListener('submit', (event) =>{
    event.preventDefault()

    let input = document.querySelector('input')
    fetch(`${BASE_URL}search?query=${input.value}`)
    .then(response => response.json())
    .then(response => response.result.forEach(joke => {
        render(joke)
    }))

})

let renderFavorite = () => {
    let store = getStore()
    store.forEach( joke => render(joke))
}

renderFavorite()