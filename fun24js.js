/** @license fun24js
 * fun24js.js
 */

'use strict';

(function(){
  var version = '0.1.2';

  //-------------------------------------------------------------------------------------
  function isNull(value) {
    return value === null;
  };
  //-------------------------------------------------------------------------------------
  function isObject (obj) {
    if (typeof(obj) === "object" && !isNull(obj) ) { return true };
    return false;
  };
  //-------------------------------------------------------------------------------------
  /*
  EXAMPLE work 'getPropertyValue' for object:
  let obj = { Id: "100", Name: "John", Address: { Id: 1, Name: "Russia" }, Null: null }

  console.log(getPropertyValue(obj, "Name"));//{ found: true, value: 'John' }
  console.log(getPropertyValue(obj, "Id"));//{ found: true, value: '100' }
  console.log(getPropertyValue(obj, "Address.Name"));//{ found: true, value: 'Russia' }
  console.log(getPropertyValue(obj, "Address.Id"));//{ found: true, value: 1 }
  console.log(getPropertyValue(obj, "Address.Idsd"));//{ found: false, value: null }
  console.log(getPropertyValue(obj, "Addre.Idsd"));//{ found: false, value: null }
  console.log(getPropertyValue(obj, "Idsd"));//{ found: false, value: null }
  console.log(getPropertyValue('obj', "Null"));//{ found: false, value: null }
  console.log(getPropertyValue(1, "Null"));//{ found: false, value: null }
  console.log(getPropertyValue(null, 'fdfd'));//{ found: false, value: null }
  console.log(getPropertyValue(obj, "Null"));//{ found: true, value: null }
  */
  function getPropertyValue (obj, path) {
    if (!isObject(obj)) { return {found: false, value: null} };

    let arrKeys = path.split('.');
    let value = obj;
    for (let i = 0; i <= arrKeys.length - 1; i++) {
      let key = arrKeys[i];
      if (value.hasOwnProperty(key)) {
        value = value[key]
      } else {
        return {found: false, value: null}
      };
    };
    return {found: true, value};
  }
  //-------------------------------------------------------------------------------------
  /*
  EXAMPLE work 'setPropertyValue' for object:
  let obj = { a: {  b:{ c:{ d:1 }, c1:1 }, b1: 1 }, a1: 1 };

  console.log(setPropertyValue(obj, 222, "a.b.c"));//return true, obj = { a: { b: { c: 222, c1: 1 }, b1: 1 }, a1: 1 }
  console.log(setPropertyValue(obj, 222, "a.b.cc", true));//return true, obj = { a: { b: { c: {d: 1}, c1: 1, cc: 222 }, b1: 1 }, a1: 1 }
  console.log(setPropertyValue(obj, 222, "a.b.cc", false));//return false, obj = without changes
  */
  function setPropertyValue (obj, value, path, createProp=true) {
    if (!isObject(obj)) { return false };

    let arrKeys = path.split('.');
    let propObj = obj;
    for (let i = 0; i <= arrKeys.length - 1; i++) {
      let key = arrKeys[i];
      if (propObj.hasOwnProperty(key)) {
        if (i === arrKeys.length - 1) {
          propObj[key] = value;
        } else {
          if (isObject(propObj[key])) {
            propObj = propObj[key];
          } else {
            propObj[key] = {};
            propObj = propObj[key];
          };
        };
      } else {
        if (createProp) {
          propObj[key] = (i === arrKeys.length - 1) ? value : {};
          propObj = propObj[key];
        } else {
          return false;
        };
      };
    };
    return true;
  }
  //-------------------------------------------------------------------------------------
  var fun24js = {
    version: version,
    isNull: isNull,
    isObject: isObject,
    getPropertyValue: getPropertyValue,
    setPropertyValue: setPropertyValue
  }

  module.exports = fun24js;

})();
