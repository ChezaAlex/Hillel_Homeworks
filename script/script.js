let table1 = document.querySelector('#table1');
let table2 = document.querySelector('#table2');
let table3 = document.querySelector('#table3');

const title1 = 'Animals info';
const title2 = 'Food info';
const title3 = 'Universes info';

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



function tableOut(a, b) {
    if(b == animals){
    document.querySelector('#title1').innerHTML = title1;
    }else if(b == food){
        document.querySelector('#title2').innerHTML = title2;
    }else{
        document.querySelector('#title3').innerHTML = title3;
    }

    for (let i = 0; i < b.length; i++) {
		let tr = document.createElement('tr');
		
		for (let j = 0; j < b[i].length; j++) {
			let td = document.createElement('td');
			td.innerHTML = b[i][j];
			tr.appendChild(td);
		}
		
		a.appendChild(tr);
	}

}
tableOut(table1, animals);
tableOut(table2, food);
tableOut(table3, universes);