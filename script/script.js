const ITCompany = {
  id: 12332129,
  companyName: 'Playtika',
  type: 'product',
  vacancies: [
      {
          frontEnd: {
              salary: 1200
          },
      },
      {
          backEnd: {
              salary: 1500
          },
      },
      {
          scramMaster: {
              salary: 500
          },
      },
      {
          tester: {
              salary: 600
          },
      }
  ]
}

let userName = workerName = "Alex",
    positionName = "scramMaster".toLowerCase(),
    userSalary = 500

function greeting() {
    document.write(`hello my name is ${workerName}, im ${positionName} developer in ${this.companyName}` );
}

function comparing(){
    let {vacancies} = ITCompany 
for(let key of vacancies){
      for(let value in key){  
        if(value.toLowerCase() == positionName && userSalary <= 1200){
            let newObject = Object.create(ITCompany)
            newObject.greeting = greeting.call(ITCompany)
            console.log(1)
        }else if(value.toLowerCase() == positionName && userSalary <= 1500 ){
            let newObject = Object.create(ITCompany)
            newObject.greeting = greeting.call(ITCompany)
            console.log(2)
        }else if(value.toLowerCase() == positionName && userSalary <= 500 ){
            let newObject = Object.create(ITCompany)
            newObject.greeting = greeting.call(ITCompany)
            console.log(3)
            
        }else if(value.toLowerCase() == positionName && userSalary <= 600 ){
            let newObject = Object.create(ITCompany)
            newObject.greeting = greeting.call(ITCompany)
            console.log(4)
            }

        }
    }
}
comparing()  
  




