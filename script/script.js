 const DEFAULT_PARAMETRS = [1, 'two', () => console.log('hello'), true, false]; 

 function funsinglelist(){
 let SINGLE_LIST_HEAD = {
 value: 0,
 next: null
 }
 for(let i = DEFAULT_PARAMETRS.length; i; --i){
 SINGLE_LIST_HEAD.value = DEFAULT_PARAMETRS.pop();
 SINGLE_LIST_HEAD = {next: SINGLE_LIST_HEAD}
 }
 let res = SINGLE_LIST_HEAD.next.value;
 console.log(res)
 }

 funsinglelist(DEFAULT_PARAMETRS)



