var Events = (function(options) {

  /**
  * obj object to expose
  **/
  var obj = {};

  /**
  * The handler
  **/
  var handlers = [];

  /**
  * Removes all the listeners
  **/
  obj.reset = function(){

    // reset to blank array
    handlers = [];

  };

  /**
  * Removes a listener
  **/
  obj.emit = function(key, data){

    // loop the items
    for(var i = 0; i < handlers.length; i++) {

      // check the handler
      if(handlers[i].key === key) {

        // set the idx
        handlers[i].callback(data);

      }

    }

  };

  /**
  * Adds a new listener
  **/
  obj.on = function(key, cb) {

    // add to the list
    handlers.push({

      key:        key,
      callback:   cb

    });

  };

  /**
  * Removes a listener
  **/
  obj.off = function(key, cb){

    // the index to use
    var idx = -1;

    // loop the items
    for(var i = 0; i < handlers.length; i++) {

      // check the handler
      if(handlers[i].key === key && 
          handlers[i].callback === cb) {

        // set the index
        idx = i;

      } else if(handlers[i].key === key && !cb) {

        // set the idx
        idx = i;

      }

    }

    // check if found
    if(idx !== -1) {

      // remove it
      handlers = handlers.splice(idx, 1);

    }

  };

  return obj;

});