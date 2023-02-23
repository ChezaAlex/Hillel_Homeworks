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
    const newObj = {};
    collect(newObj, obj);
    return newObj;
  }
  convert()
  
  function collect(newObj, obj) {
    for (let [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        collect(newObj, value);
        continue;
      }
      newObj[key] = value;
    }
  }