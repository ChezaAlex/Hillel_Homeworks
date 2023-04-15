let form = document.querySelector('form')
let createHeroesWrapper = document.querySelector('#createHeroes')

let render = (hero) =>{
  let heroBlock = document.createElement('form')
  heroBlock.setAttribute('id',`${hero.id}`) 
  heroBlock.className = `${hero.name}`.replace(/ /g,'')
  heroBlock.innerHTML = `
    <label for=""> Name:
        <input type="text" data-name="name" value =${hero.name}>
    </label>
    <label for=""> Comics:
        <select name="" id="" data-name="Comics" value = ${hero.comics}>
            <option value="DC">DC</option>
            <option value="Marvel">Marvel</option>
        </select>
    </label>
    <label for="" data-name="Comics"> Favorite
        <input type="checkbox" class = "getInput" ${hero.favourite ? 'checked' : ''}>
    </label>
    <button type="submit" name ="Update">Update</button>
    <button type="submit" name ="Delete">Delete</button>`
    createHeroesWrapper.append(heroBlock)
    heroBlock.addEventListener("submit", (e)=> {
      e.preventDefault()
        let classHero = e.target.className
        let idHero = e.target.id
        let deletedNode = document.querySelector(`.${classHero}`)
        let favourite = heroBlock.querySelector('input[class = "getInput"]')
      if (e.submitter.name === "Update") {
        hero.favourite = favourite.checked
        changeHero(idHero, hero)
      }else if(e.submitter.name === "Delete"){
        deletedNode.remove()
        deleteHero(idHero)
      }
    });
}

let createHero = async (obj) =>{
  let result = await fetch("https://63693f7228cd16bba71904e4.mockapi.io/heroes",{
    method: 'POST',
    headers:{
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj)
  }).then(res=>res.json())
  
  render(result)
}

form.addEventListener('submit', (e) =>{
  e.preventDefault() 

  let name = form.querySelector('input[data-name="name"]')
  let comics = form.querySelector('select')
  let favourite = form.querySelector('input[type="checkbox"]')

  let newHero = {
    name: name.value,
    comics: comics.value,
    favourite: favourite.value
  }
  createHero(newHero) 
})

let getExistedHeroes = async() =>{
    let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/`,{
    method: 'GET',
    headers:{
      "Content-type": "application/json",
    }
  }).then(res=>res.json())
    result.forEach(e => {render(e)})
}
getExistedHeroes()

let deleteHero = async(idHero) =>{
  let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/${idHero}`,{
    method: 'DELETE',
  }).then(res=>res.json())
}

let changeHero = async (idHero, hero) =>{
  let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/${idHero}`,{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hero)
}).then(res=>res.json())
}