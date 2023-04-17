  let form = document.querySelector('form')
  let createHeroesWrapper = document.querySelector('#createHeroes')
  let comicsSelect = document.querySelector('#comics');

  let render = (hero) =>{
    let heroBlock = document.createElement('form')
    heroBlock.setAttribute('id',`${hero.id}`) 
    heroBlock.className = `${hero.name}`.replace(/ /g,'')

    heroBlock.innerHTML = `
      <label for=""> Name:
          <input type="text" data-name="name" value =${hero.name}>
      </label>
      <label for=""> Comics:
          <select data-name="Comics">
              <option value="DC" ${hero.comics == 'DC' ? 'selected' : ''} >DC</option>
              <option value="Marvel" ${hero.comics == 'Marvel' ? 'selected' : ''}>Marvel</option>
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
          let name = heroBlock.querySelector(`input[data-name="name" ]`)
          let comics = heroBlock.querySelector(`select[data-name="Comics" ]`)
        if (e.submitter.name === "Update") {
            let changedHero = {
                  name: name.value,
                  comics: comics.value,
                  favourite: favourite.checked
            }
          changeHero(idHero, changedHero)
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
  let checkIfNameExists = async (name) => {
    let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes?name=${name}`,{
      method: 'GET',
      headers:{
        "Content-type": "application/json",
      }
    }).then(res=>res.json())
    return result.length > 0;
  }
  form.addEventListener('submit', async  (e) =>{
    e.preventDefault() 

    let name = form.querySelector('input[data-name="name"]')
    let comics = form.querySelector('select')
    let favourite = form.querySelector('input[type="checkbox"]')

    let newHero = {
      name: name.value,
      comics: comics.value,
      favourite: favourite.value
    }
    if (await checkIfNameExists(newHero.name)) {
      console.log(`A hero with name "${newHero.name}" already exists.`);
      return;
    }

    createHero(newHero);
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

  let getComicses = async() =>{
    let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/universes`,{
    method: 'GET',
    headers:{
      "Content-type": "application/json",
    }
    }).then(res=>res.json())
      .then(data => {
        data.forEach(universe => {
          let option = document.createElement('option');
          option.value = universe.name;
          option.text = universe.name;
          comicsSelect.add(option);
        });
    })
  }
  getComicses()

  let deleteHero = async(idHero) =>{
    let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/${idHero}`,{
      method: 'DELETE',
    }).then(res=>res.json())
  }

  let changeHero = async (idHero, changedHero) =>{
    let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/${idHero}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changedHero)
  }).then(res=>res.json())
  }
