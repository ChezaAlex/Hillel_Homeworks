	const userData = {
		USD: 1000,
		EUR: 900,
		UAH: 15000,
		BIF: 20000,
		AOA: 100
	};

	const bankData = {
	    USD: {
		max: 3000,
		min: 100,
		img: '💵'
	    },
	    EUR: {
		max: 1000,
		min: 50,
		img: '💶'
	    },
	    UAH: {
		max: 0,
		min: 0,
		img: '💴'
	    },
	    GBP: {
		max: 10000,
		min: 100,
		img: '💷'
	    }
	}

	function getMoney(){
	  let balance = prompt('Подивитися баланс карті?(Так/Ні)').toLowerCase()
	  let newPromice = new Promise((resolve, reject) => {
	    if(balance == 'так'){
		resolve(true)
	    }else if(balance == 'ні'){
		reject(false)
	    }else{
		location.reload() 
	    }
	  })

	  newPromice
	    .then(
	    (resolve) =>{
	      while(true){
		let currency = prompt('Оберіть валюту: USD, EUR, UAH, BIF, AOA').toUpperCase()
		let userCurrency = Object.keys(userData).filter(el => el == currency)
		  if(userCurrency == 'USD'){
		    console.log(`Баланс становить: ${userData.USD} USD`)
		    break
		  }else if(userCurrency == 'EUR'){
		    console.log(`Баланс становить: ${userData.EUR} EUR`)
		    break
		  }else if(userCurrency == 'UAH'){
		    console.log(`Баланс становить: ${userData.UAH} UAH`)
		    break
		  }else if(userCurrency == 'BIF'){
		    console.log(`Баланс становить: ${userData.BIF} BIF`)
		    break
		  }else if(userCurrency == 'AOA'){
		    console.log(`Баланс становить: ${userData.AOA} AOA`)
		    break
		  }
	      }
	      },
	    (reject) =>{
	      while(true){
		let userCurrency = prompt('Оберіть валюту для зняття: USD, EUR, UAH, GBP').toUpperCase()  //валюта от польз
		if(userCurrency == 'USD'){
		  getMonney(userCurrency, userData, bankData)
		  break
		}else if(userCurrency == 'EUR'){
		  getMonney(userCurrency, userData, bankData)
		  break
		}else if(userCurrency == 'UAH'){
		  getMonney(userCurrency, userData, bankData)
		  break
		}else if(userCurrency == 'GBP'){
		  getMonney(userCurrency, userData, bankData)
		  break
		}
	      }
	      function getMonney(userCurrency,userData, bankData){
		let userCash = Object.entries(userData).find(el => el[0] == userCurrency)// возват валюты - значения польз согласно введенной валюты

		let bankCurrency = Object.entries(bankData).find(el => el[0] == userCurrency) // возват валюты - значения банка согласно введенной валюты

		let cash = prompt('Яку сумма хочете зняти?') 
		let maxCash = Object.entries(bankCurrency[1]).filter(el => el[0] == 'max').flat() //возврат массива из баланса банка с макс знач
		let minCash = Object.entries(bankCurrency[1]).filter(el => el[0] == 'min').flat() //возврат массива из баланса банка с мин знач
		  if(cash < maxCash[1] && cash <= userCash[1] && cash > minCash[1]){
		      console.log(`От ваші гроші ${cash} ${bankCurrency[1].img}`)
		  }else if(cash < minCash[1]){
		      console.log(`Введена сума менша за доступну. Мінімальна сума зняття: ${minCash[1]}`)
		  }else if(cash > maxCash[1]){
		    console.log(`Введена сума більша за доступну. Максимальна сума зняття: ${maxCash[1]}`)
		  }else{
		      console.log(`Введена сума більша за доступну. Максимальна сума зняття: ${userCash[1]}`)
		  }
		}
	})
	    .finally(
	      () => {
		console.log('Дякую, гарного дня 😊')
	      }
	    )
	}
	getMoney()


        
