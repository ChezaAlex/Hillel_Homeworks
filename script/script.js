let table1 = document.querySelector('#table1')
let table2 = document.querySelector('#table2')
let table3 = document.querySelector('#table3')

const animals = [
	['🐭','mouse','Jerry'],
	['🐹','hamster','Biscuit'],
	['🐰','rabbit','Bugs'],
	['🦊','fox','Mrs. Fox'],
	['🐻','bear','Paddington']
];
const food = [
	['🍎','apple',10],
	['🍐','pear',12],
	['🍊','tangerine',15],
	['🍋','lemon',5],
	['🍌','banana',7]
];
const universes = [
	['🖤', 'DC', ['Superman', 'Batman', 'Wonder Woman']],
	['❤️', 'Marvel', ['Iron Man', 'the Hulk', 'Black Widow']]
]

getInfo(animals, 'Animals')
getInfo(food, 'Food')
getInfo(universes, 'Universes')


function getInfo(name, title){
	
    if(name == animals){
		document.querySelector('#title1').innerHTML = title + ' info';
		}else if(name == food){
			document.querySelector('#title2').innerHTML = title + ' info';
		}else{
			document.querySelector('#title3').innerHTML = title + ' info';
		}
	for(let i =0; i<name.length; i++){
		let tr = document.createElement('tr');
		for(let j=0; j<name[i].length; j++){
			let	td = document.createElement('td');
				td.innerHTML = name[i][j];
				tr.appendChild(td)
		}
		if(title =='Animals'){
			table1.appendChild(tr);
		}else if(title =='Food'){
			table2.appendChild(tr);
		}else{ 
			table3.appendChild(tr);
		}
	}
}