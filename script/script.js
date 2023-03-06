const ARRAY = document.querySelector('.arrnum').value;
function value(){
    let arr = ARRAY
    if(arr == 0){document.querySelector('.out').innerHTML = "Введіть ваше число"
    }else{
    arr = arr.split(",").map(string => parseInt(string));
    }
   return arr
}

function quantitypositivesum(){
    let arr = value()
    let positivearr = arr.filter(element => element > 0);
    let sum = 0;
    for(let i = 0; i<arr.length; i++){
        if(arr[i]>=0){sum += arr[i]}
    }
    document.querySelector('.out').innerHTML = "Сума позитивних елементів: " + sum + "<br>" + "Кількість позитивних елементів: " + positivearr.length;
}

function minelem(){
    let arr = value()
    let min = Math.min.apply(null, arr)
    let minindex = arr.indexOf(min);
    document.querySelector('.out').innerHTML = "Мінімальний елемент масиву: " + min + "<br>" + "Порядковий номер: " + minindex;
}

function maxelem(){
    let arr = value()
    let max = Math.max.apply(null, arr)
    let maxindex = arr.indexOf(max);
    document.querySelector('.out').innerHTML = "Максимальний елемент масиву: " + max + "<br>" + "Порядковий номер: " + maxindex;
}

function quantitynagative(){
    let arr = value()
    let negativearr = arr.filter(element => element < 0);
    document.querySelector('.out').innerHTML = "Кількість негативних елементів: " + negativearr.length;
}

function quantitynagativeodd(){
    let arr = value()
    let negativearr = arr.filter(element => element < 0);
    let oddnegativearr = []
    for(let i = 0; i<negativearr.length; i++ ){
        if(negativearr[i] % 2 !== 0){
            oddnegativearr.push(negativearr[i])
        }
    }
    document.querySelector('.out').innerHTML = "Кількість непарних негативних елементів: " + oddnegativearr.length;
}

function quantitypositiveeven(){
    let arr = value()
    let positivearr = arr.filter(element => element > 0);
    let evenpositivearr = []
    for(let i = 0; i<positivearr.length; i++ ){
        if(positivearr[i] % 2 == 0){
            evenpositivearr.push(positivearr[i])
        }
    }
    document.querySelector('.out').innerHTML = "Кількість парних позитивних елементів: " + evenpositivearr.length;
}

function sumpositiveeven(){
    let arr = value()
    let positivearr = arr.filter(element => element > 0);
    let evenpositivearr = 0
    for(let i = 0; i<positivearr.length; i++ ){
        if(positivearr[i] % 2 == 0){
            evenpositivearr+= positivearr[i]
        }
    }
    document.querySelector('.out').innerHTML = "Cума парних позитивних елементів: " + evenpositivearr;
}

function sumpositiveodd(){
    let arr = value()
    let positivearr = arr.filter(element => element > 0);
    let oddpositivearr = 0
    for(let i = 0; i<positivearr.length; i++ ){
        if(positivearr[i] % 2 !== 0){
            oddpositivearr+= positivearr[i]
        }
    }
    document.querySelector('.out').innerHTML = "Cума непарних позитивних елементів: " + oddpositivearr;
}

function multpositive(){
    let arr = value()
    let positivearr = arr.filter(element => element > 0);
    let res = positivearr.reduce((acc, rec) => acc * rec);
    document.querySelector('.out').innerHTML = "Добуток позитивних елементів: " + res;
}

function maxelemnull(){
    let arr = value()
    let max = Math.max.apply(null, arr)
    for(let i=0; i<arr.length; i++){
        if(arr[i] !==  max){arr[i] = 0}
    }
    document.querySelector('.out').innerHTML = "Найбільший серед елементів масиву, інші довінюють нулю: " + "[" + arr + "]";
}