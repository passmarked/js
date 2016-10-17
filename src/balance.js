var Balance = (function(options) {

  /**
  * obj object to expose
  **/
  var obj = Events();

  /**
  * Returns a key from the data in model
  **/
  obj.get = function(key) {

    // returns the item
    return options[key];

  };

  /**
  * Returns the amount of credits available
  **/
  obj.getBalance = function() {

    // return
    return parseInt(options.get('balance'));

  };

  /**
  * Returns the full name of the user
  **/
  obj.getUsed = function() {

    // return
    return parseInt(options.get('used'));

  };

  /**
  * Returns the full name of the user
  **/
  obj.getCount = function() {

    // return
    return parseInt(options.get('count'));

  };

  // return the page
  return obj;

});