var Issue = (function(options) {

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
  * Returns the number of times this was seen as criticals
  **/
  obj.getCriticals = function() {

    return parseInt(obj.get('criticals'));

  };

  /**
  * Returns the number of times this was seen as errors
  **/
  obj.getErrors = function() {

    return parseInt(obj.get('errors'));

  };

  /**
  * Returns the number of times this was seen as warnings
  **/
  obj.getWarnings = function() {

    return parseInt(obj.get('warnings'));

  };

  /**
  * Returns the number of times this was seen as notices
  **/
  obj.getNotices = function() {

    return parseInt(obj.get('notices'));

  };

  /**
  * Returns the number of times this was seen,
  * this is the aggregate of all levels
  **/
  obj.getCount = function() {

    return parseInt(obj.get('count'));

  };

  /**
  * Returns the impact this issue had
  **/
  obj.getImpact = function() {

    return parseFloat(obj.get('impact'));

  };

  /**
  * Returns the weight of the issue
  **/
  obj.getWeight = function() {

    return parseFloat(obj.get('weight'));

  };

  /**
  * Returns the level of the issue
  **/
  obj.getType = function() {

    return obj.get('type');

  };

  /**
  * Returns the category of the issue
  **/
  obj.getCategory = function() {

    // returns the category
    return obj.get('category');

  };

  /**
  * Returns the test of the issue
  **/
  obj.getTest = function() {

    // returns the TEST
    return obj.get('test');

  };

  /**
  * Returns the uid of the issue
  **/
  obj.getUID = function() {

    // returns the UID
    return obj.get('uid');

  };

  /**
  * Returns the message of the issue
  **/
  obj.getMessage = function(format) {

    // just return
    return obj.get('message');

  };

  // return the page
  return obj;

});