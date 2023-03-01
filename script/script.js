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



let 
    userName = workerName = prompt('Please, enter your name:'),
    positionName = prompt('Please, enter position "FrontEnd", "BackEnd","ScramMaster","Tester"').toLowerCase(),
    userSalary = prompt('Please, enter your desired salary:')
    userSalary = Number(userSalary)




if(userName.length ==  0 && positionName.length ==  0 && userSalary.length ==  0){
    alert('Please, fill in all the fields')
} else if(positionName !== "frontend" && positionName !== "backend" && positionName !== "scrammaster" && positionName !== "tester"){
    alert('Please put correct position name')
}else if(userSalary !== userSalary){
    alert('Please put only numbers in "desired salary"')
}else{
    comparing() 
}




function greeting() {
    document.write(`Hello my name is ${workerName}, im ${positionName} developer in ${this.companyName}` );
}

function refusal(){
    document.write(`${userName}, you has significant skills at ${positionName} but we hired another developer, let's keep contact !`)
}



function comparing(){
    let {vacancies} = ITCompany 
    let vacancy = vacancies.map(el=>{
        let vacancyName = Object.keys(el)[0].toLowerCase()
        return vacancyName === positionName
    }).findIndex(function (e){ return e == true})
    if(vacancy == -1)
    {refusal.call(ITCompany)}
        else{
    let vacantion = vacancies[vacancy]
       let salary = Object.values(vacantion).map(el => Object.values(el) >= userSalary);
      if(salary[0] == true){
        let newObject = Object.create(ITCompany)
                        newObject.userName = userName
                        newObject.positionName = positionName
                        newObject.userSalary = userSalary
                        newObject.greeting = greeting.call(ITCompany)
                        console.log(newObject)
          }else{
            refusal.call(ITCompany)
        }
    }
}
 










