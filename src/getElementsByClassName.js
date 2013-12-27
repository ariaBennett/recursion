// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  var objects = document.body.children;
  var matches = [];
  all = [];

  var findClass = function(object) {
    _.each(object.classList, function(potentialClass){
      console.log("potentialClass: " + potentialClass);
      if (className == potentialClass) {
        console.log("found it: " + object);
        matches.push(object);
      }
    });
  };

  var findSubobjects = function(object) {
    try {
    all.push(object);
      _.each(object, function(subObj){
        if (subObj.hasChildNodes) {
          console.log("subObj: " + subObj);
          findSubobjects(sobObj);
        }
      });
    }
    catch(err) {
    all.push(object);
      console.log("hit bottom");
      findClass(object);
    }
  };

  _.each(objects, function(object){
    findSubobjects(object);
  });

  return matches;
};
