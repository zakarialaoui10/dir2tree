function clean_object(obj, keyToRemove) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }  
    const result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key !== keyToRemove) {
          result[key] = clean_object(obj[key], keyToRemove);
        }
      }
    }
    return result;
  }
  

  
export {clean_object}