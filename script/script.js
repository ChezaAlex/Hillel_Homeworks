const obj = {
    x: 10,
    y: 20,
    inner: {
        x: 20,
        z: 30
    },
    foo2: {
        k: 23,
        p: 13
    }
} 


function convert() {
  let objCopy = {}; 
  let key;

  for (key in obj) {
    if(typeof(obj[key]) == 'number'){
      objCopy[key] = obj[key]; 
    }
  }
  for(key in obj.inner){
      objCopy[key] = obj.inner[key];
  }
    for(key in obj.foo2){
    objCopy[key] = obj.foo2[key];
  }
  console.log (objCopy);
}
convert()