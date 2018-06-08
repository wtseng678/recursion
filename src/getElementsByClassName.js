// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
 var list = [];
  function test(element) {
    if (_(element.classList).contains(className)) {
      list.push(element);
    }
    _(element.childNodes).forEach(function(child) {
      test(child);
    });
  }
  test(document.body);
  return list;
};
