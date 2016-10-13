var log = (function(options) {

  /**
  * obj object to expose
  **/
  var obj = {};

  /**
  * Debug property
  **/
  var debugEnabled = false;

  /**
  * Set the item
  **/
  obj.enableLogging = function() {

    // set it
    debugEnabled = true;

  };

  /**
  * debug
  **/
  obj.log = function(level, message, err) {

    // skip if not enabled
    if(debugEnabled === false) return;

    // the background colors
    var backgroundStyles = '';
    
    // check the level
    if(level === 'debug') {

      // set the styles
      backgroundStyles = 'color: #666';

    } else if(level === 'info') {

      // set the styles
      backgroundStyles = 'color: #666';

    } else if(level === 'warning') {

      // set the styles
      backgroundStyles = 'background: #FF851B; color: #666';

    } else if(level === 'error') {

      // set the styles
      backgroundStyles = 'background: #FF4136; color: white';

    }

    // log out
    console.log('%c' + message, backgroundStyles);

    // check for the error
    if(err) console.error(err);

  };

  /**
  * Log out to console
  **/
  obj.debug = function(key, message){

    // add it
    obj.log('debug', key + ': ' + message);

  };

  /**
  * Log out to console
  **/
  obj.info = function(key, message){

    // add it
    obj.log('info', key + ': ' + message);

  };

  /**
  * Log out to console
  **/
  obj.warning = function(key, message){

    // add it
    obj.log('warning', key + ': ' + message);

  };

  /**
  * Log out to console
  **/
  obj.error = function(key, message, err){

    // add it
    obj.log('error', key + ': ' + message);

  };

  return obj;

})();