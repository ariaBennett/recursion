function stringifyJSON(val) {
  debugMode = true;
  if (debugMode) {console.log("val == " + val);}

  if (typeof(val) == "number") {
    return val.toString();
  }

  if (val == null) {
    return "null";
  }

  if (typeof(val) == "boolean") {
    if (val) {
      return 'true';
    }
    else {
      return 'false';
    }
  }

  if (typeof(val) == "string") {
    return '"' + val + '"';
  }

  if (typeof(val) == "object") {
    var type = Object.prototype.toString.call(val);
    if (type == "[object Array]") {
      var items = "";
      _.each(val, function(item){
          items = items + stringifyJSON(item);
      });
      return "[" + items + "]";
    }
  }

  if (debugMode) {console.log("val == " + val);}

  return val;

}

// test cases are described in fixtures.js
describe("stringifyJSON", function(){
  it("should match the result of calling JSON.stringify", function(){

    arrayWithValidElements = stringifiableValues;
    arrayWithValidElements.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      expect(result).toEqual(expected);
    });

    objectWithInvalidAttributes.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      expect(result).toEqual(expected);
    });

  });
});
