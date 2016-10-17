var Occurrence = (function(options) {

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
  * Returns the chain, if defined, for the occurrence
  **/
  obj.getChain = function() {

    return obj.get('url');

  };

  /**
  * Returns the url if defined for the occurrence
  **/
  obj.getURL = function() {

    return obj.get('url');

  };

  /**
  * Returns the code of the occurrence
  **/
  obj.getCode = function() {

    return obj.get('code');

  };

  /**
  * Returns the code of the occurrence
  **/
  obj.getCode = function() {

    return obj.get('code');

  };

  /**
  * Returns the display type of the occurrence
  **/
  obj.getDisplay = function() {

    return parseFloat(obj.get('display'));

  };

  /**
  * Returns the impact this issue had
  **/
  obj.getImpact = function() {

    return parseFloat(obj.get('impact'));

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
  obj.getMessage = function(format) {

    // should we format the message ?
    if(format === true) {

      // yeap !
      var message = '' + obj.get('message');

      // loop and replace
      for(var i = 0; i < (options.identifiers || []).length; i++) {

        // replace the placeholders
        message = message.replace('$', '`' + options.identifiers[i] + '`')

      }

      // done
      return message;

    } else {

      // just return
      return obj.get('message');

    }

  };

  // return the page
  return obj;

});