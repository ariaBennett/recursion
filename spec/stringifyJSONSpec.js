// helpers
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
    return size;
};

function stringifyJSON(val) {
  debugMode = true;

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
      var valLength = val.length;
      _.each(val, function(item){
          items = items + stringifyJSON(item);
          if (valLength > 1) {
            items = items + ",";
            valLength -= 1;
          }
      });
      return "[" + items + "]";
    }
  }

  if (typeof(val) == "object") {
    var type = Object.prototype.toString.call(val);
    if (type == "[object Object]") {
      var items = "";
      var valLength = Object.size(val);
      console.log(valLength);
      _.each(val, function(item, key){
        if ((typeof(item) !== "function") && (item !== undefined)) {
          items = items + stringifyJSON(key) + ":" + stringifyJSON(item);
          if (valLength > 1) {
            items = items + ",";
            valLength -= 1;
          }
        }
        else {
          valLength -= 1;
        }
      });
      return "{" + items + "}";
    }
  }

  if ((typeof(val) == "function") || (val == undefined)) {
    return "";
  }

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

    objectWithInvalidAttributes = nonStringifiableValues;
    objectWithInvalidAttributes.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      expect(result).toEqual(expected);
    });

  });
});
