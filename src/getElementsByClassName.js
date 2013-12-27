// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
  all = [];
var getElementsByClassName = function (className) {
  var objects = document.body.children;
  matches = [];

  var hasClass = function(query, target) {
    var foundClass = false;
    _.each(target.classList, function(potentialClass){
      if (query === potentialClass) {
        foundClass = true;
      }
    });
    return foundClass;
  };

  var searchForClass = function(query, target, storage) {
    _.each(target, function(object){
      if (hasClass(query, object)) {
        storage.push(object);
      }
      try {
        if (object.hasChildNodes()) {
          searchForClass(query, object.children, storage);
        }
      }
      catch (err) {
      }
      all.push(object);
    });
  }
  
  searchForClass(className, objects, matches);

  return matches;
};
