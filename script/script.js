let inp = [false, null, 0, NaN, undefined, 5, 5, 5, " "]

function firstfunc(){
	let fil = inp.filter(v => typeof(v) == 'number' && v==v && v!==0);
	let res = fil.reduce((a,b) => a + b)/fil.length;
	console.log(res)
}
firstfunc(inp)

/////////////////////////////////////////////////////////////////

function doMath(){
	let x = document.querySelector(".inp1func2").value;
	let znak = document.querySelector(".operator").value;
	let y = document.querySelector(".inp2func2").value;
	let math = 0;
		switch(znak) {
			case '+':
			if(x.length == 0 || y.length ==0){
				math = x + y
			}else{
			math = parseInt(x) + parseInt(y);
			}
			break;
			case '-':
			math = x - y;
			break;
			case '*':
			math = x * y;
			break;
			case '/':
			if(y.length == 0){
				math = "Ділення на нуль";
			}else{math = x / y;}
			break;
			case '%':
			math = x / 100 * y || x / 100;
			break;
			case '^':
			math = Math.pow(x, y);
			break;
		}
		document.querySelector('.out2').innerHTML = math;
}


///////////////////////////////////////////////////////////////


let ArrayMult = () => {
	let outarr = document.querySelector(".inp1func3").value
	let innerarr = document.querySelector(".inp2func3").value
	let value = document.querySelector(".inp3func3").value
	let table1 = document.querySelector('#table1')

	if(outarr.length !== 0 && innerarr.length !== 0 && value.length !== 0){
		let arr = new Array(outarr);
		for(i=0; i<outarr; i++){
			arr[i] = new Array(innerarr);
		}
			for(i=0;i<outarr;i++){
				for(j=0; j<innerarr; j++){
				arr[i][j] = value;
			}
		}
		console.log(arr)
		let ArrTable = () => {
			for(let i =0; i<arr.length; i++){
				let tr = document.createElement('tr');
				for(let j=0; j<arr[i].length; j++){
					let	td = document.createElement('td');
						td.innerHTML = arr[i][j];
						tr.appendChild(td)
				}
				table1.appendChild(tr);
		}
	}
	ArrTable()
	}else{
		document.querySelector('.out3').innerHTML = "Заповніть всі поля";
	}
}


//////////////////////////////////////////////////////////////

const formatter = (string) => string.toUpperCase()

function func(...args){
	let letter = args.filter( el => el.length == 1 && typeof(el) == 'string')
	let word =  args.filter(el => el.length > 1)[0].split('')
	let string = word.filter(el => !letter.includes(el)).join('')
	let func = args.filter(el => typeof(el) == 'function')
	
	console.log(func[0](string))
}
func("hello world", 'o', 'h', formatter) 

