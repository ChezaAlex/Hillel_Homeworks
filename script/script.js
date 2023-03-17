let root = document.querySelector('body')
let field = document.querySelector('.field')
let div = document.createElement('div')
div.innerHTML = 'Hello'
div.className = 'block'
div.style.top = 0
div.style.left = 0
let windowHeight = 500;
let windowWidth = 700;


field.insertAdjacentElement('beforeend', div);

setInterval(
	() => {
		let rColor = (Math.random() + ' ').slice(2,8)
		div.style.backgroundColor = '#' + rColor
	}, 500
)

setInterval(
	() => {
		let rDirection = Math.round(Math.random()*2)

		let lStep  = Math.floor(Math.random() * windowWidth)+1;
		let tStep  = Math.floor(Math.random() * windowHeight)+1;

		if(rDirection == 0){
			div.style.left = lStep + 'px'
		}else if(rDirection == 1){
			div.style.top = tStep + 'px'
		}else if(rDirection == 2){
			div.style.left = lStep + 'px'
			div.style.top = tStep + 'px'
		}
	}, 1000
)
