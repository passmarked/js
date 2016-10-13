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

    return obj.get('category');

  };

  /**
  * Returns the test of the issue
  **/
  obj.getTest = function() {

    return obj.get('test');

  };

  /**
  * Returns the uid of the issue
  **/
  obj.getUID = function() {

    return obj.get('uid');

  };

  /**
  * Returns the message of the issue
  **/
  obj.getMessage = function() {

    return obj.get('message');

  };

  /**
  * Returns the message of the issue
  **/
  obj.getPreviewURL = function() {

    return [

      'https://beta.passmarked.com/library',
      obj.get('category'),
      obj.get('test'),
      obj.get('uid'),
      utils.slugify(obj.get('message'))

    ].join('/')

  };

  // return the page
  return obj;

});