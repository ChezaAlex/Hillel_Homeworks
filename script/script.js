	const square = document.querySelector('.square')
	square.style.top = "0px"
	square.style.left = "0px"

function moveIt(event){
if(event.charCode == 119){
	square.style.top = (parseInt(square.style.top) -10) +'px'
}else if(event.charCode == 115){
	square.style.top = (parseInt(square.style.top) + 10) +'px'
}else if(event.charCode == 97){
	square.style.left = (parseInt(square.style.left) - 10) +'px'
}else if(event.charCode == 100){
	square.style.left = (parseInt(square.style.left) + 10) +'px'
}else if(event.charCode == 32){
	square.style.top = (parseInt(square.style.top) -10) +'px'
	setTimeout(() =>{
		square.style.top = (parseInt(square.style.top) +10) +'px'
	}, 500)
}
if(parseInt(square.style.left) > 350){
	square.style.left = (parseInt(square.style.left) - 20) +'px'
	document.querySelector('.square').innerHTML = "БЕМС";
	setTimeout(()=>{
	document.querySelector('.square').innerHTML = "";
	}, 2000)
}
if(parseInt(square.style.top) > 265){
	square.style.top  = (parseInt(square.style.top ) - 20) +'px'
	document.querySelector('.square').innerHTML = "БЕМС";
	setTimeout(()=>{
	document.querySelector('.square').innerHTML = "";
	}, 2000)
}
if(parseInt(square.style.left) < -350){
	square.style.left = (parseInt(square.style.left) + 20) +'px'
	document.querySelector('.square').innerHTML = "БЕМС";
	setTimeout(()=>{
	document.querySelector('.square').innerHTML = "";
	}, 2000)
}
if(parseInt(square.style.top) < -265){
	square.style.top = (parseInt(square.style.top) + 20) +'px'
	document.querySelector('.square').innerHTML = "БЕМС";
	setTimeout(()=>{
	document.querySelector('.square').innerHTML = "";
	}, 2000)
}
}

function sitDown(event){
if(event.code == "ControlLeft"){
	square.style.width = 125 + 'px'
	square.style.height = 60 + 'px'
}
}
function upSide(event){
if(event.code == "ControlLeft"){
	square.style.width = 100 + 'px'
	square.style.height = 100 + 'px'
}
}
	document.addEventListener('keydown', sitDown)
	document.addEventListener('keyup', upSide)
	document.addEventListener('keypress', moveIt)
