var Page = (function(options) {

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
  * Returns the issues if given
  **/
  obj.getRules = function() {

    // rules to return
    var rules = [];

    // loop and match keys
    for(var i = 0; i < (options.issues || []).length; i++) {

      // create and add model
      rules.push( Issue(options.issues[i]) );

    } 

    // default we found nothing ...
    return rules;

  };

  /**
  * Returns true/false based on if the rule is present
  **/
  obj.hasRule = function(key) {

    // loop and match keys
    for(var i = 0; i < (options.issues || []).length; i++) {

      // check if it matches ?
      if(options.issues[i].uid === key) {

        // done
        return true;

      }

    } 

    // default we found nothing ...
    return false;

  };

  /**
  * Returns the stack of the website that was detected in keywords
  **/ 
  obj.getStack = function() { return obj.get('stack') || [] };

  /**
  * Returns true/false based on if the stack is present
  **/
  obj.hasStack = function(key) {

    // clean up the key
    var cleanedKey = (key || '').toLowerCase();

    // loop and match keys
    for(var i = 0; i < (options.stack || []).length; i++) {

      // check if it matches ?
      if(options.stack[i].uid === cleanedKey) {

        // done
        return true;

      }

    } 

    // default we found nothing ...
    return false;

  };

  /**
  * Returns the pallette of the page
  **/ 
  obj.getPalette = function() { return obj.get('palette') || [] };

  /**
  * Returns the screenshots
  **/ 
  obj.getPreviews = function() { return obj.get('previews') || [] };

  /**
  * Returns a specific screenshot
  **/
  obj.getPreview = function(key) {

    // loop the screenshots
    for(var i = 0; i < (options.previews || []).length; i++) {

      // check and return
      if(options.previews[i].key === key) {

        // return it
        return options.previews[i];

      }

    }

    // return null for a default
    return null;

  };

  /**
  * Returns the score of the page
  **/
  obj.getScore = function() {

    return parseFloat(obj.get('score'));

  };

  /**
  * Returns the result of the current pagee
  **/
  obj.getResult = function() {

    return (obj.get('result') || 'pending').toLowerCase();

  };

  /**
  * Returns the current status of the report
  **/
  obj.getStatus = function() {

    return (obj.get('status') || 'pending').toLowerCase();

  };

  /**
  * Returns the IP of the remote server
  **/
  obj.getIP = function() {

    return obj.get('ip');

  };

  /**
  * Returns the protocol family of the remote website
  **/
  obj.getFamily = function() {

    return obj.get('family');

  };

  /**
  * Returns the latitude if the IP was able to be GEOIP'd
  **/
  obj.getLat = function() {

    return obj.get('lat');

  };

  /**
  * Returns the protocol of final domain
  **/
  obj.getProtocol = function() {

    return obj.get('protocol');

  };

  /**
  * Returns the final domain of the website
  **/
  obj.getDomain = function() {

    return obj.get('domain');

  };

  /**
  * Returns the port of final target
  **/
  obj.getPort = function() {

    return obj.get('port');

  };

  /**
  * Returns the longitude if the IP was able to be GEOIP'd
  **/
  obj.getLng = function() {

    return obj.get('lng');

  };

  /**
  * Returns the url of the 
  **/
  obj.getURL = function() {

    return obj.get('url');

  };

  /**
  * Returns the preview url of the report
  **/
  obj.getPreviewURL = function() {

    return [

      'https://passmarked.com/reports/' + obj.get('uid')

    ].join('/')

  };

  // return the page
  return obj;

});