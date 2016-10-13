var utils = (function() {

  // the object to return
  var obj = {};

  /**
  * Returns true/false based on if we are in a IFrame
  **/
  obj.isInFrame = function () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
  };

  /**
  * Slugs a string passed
  **/
  obj.slugify = function(text) {

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

  }

  /**
  * Merges all the passed properties
  **/  
  obj.merge = function() {

    // the final object
    var mergeOutput = {};

    // loop the items
    for(var arg in arguments) {

      // set the args
      var argument = arguments[arg];

      // loop the properties
      for (var attrname in argument) { 

        // set the keys
        mergeOutput[attrname] = argument[attrname]; 

      }

    }

    // return the output
    return mergeOutput;

  };

  /**
  * Creates a GUID that can be used
  **/ 
  obj.uuid = function() {

    // create a small uuid, does not need
    // absolute random-ness
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  };

  /**
  * Set the bundle items
  **/
  obj.forEach = function(className, func) {

    // add the onclick button
    var els = document.getElementsByClassName(className);

    // Loop all the menu items and add a event handler to them
    for(var a = 0; a < els.length; a++) {

      // handle the menu item
      (func( els[a] ));

    }

  };

  /**
  * Set the bundle items
  **/
  obj.setInnerHTML = function(className, text) {

    // add the onclick button
    var els = document.getElementsByClassName(className);

    // Loop all the menu items and add a event handler to them
    for(var a = 0; a < els.length; a++) {

      // handle the menu item
      (function(el){

        // set the el
        el.innerHTML = text;

      }( els[a] ));

    }

  };

  /**
  * Binds to the "onsubmit" function of browsers
  **/
  obj.onsubmit = function(className, callback) {

    // add the onclick button
    var formEls = document.getElementsByClassName(className);

    // Loop all the menu items and add a event handler to them
    for(var a = 0; a < formEls.length; a++) {

      // handle the menu item
      (function(form_el){

        // add the handler that will handle a click on this elemtn
        if(form_el.addEventListener) form_el.addEventListener("submit", callback, false);
        else if(form_el.attachEvent) form_el.attachEvent('onsubmit', callback);
        else form_el.onsubmit = callback;

      }( formEls[a] ));

    }

  };

  /**
  * Bind to the onclick of buttons
  **/
  obj.onclick = function(className, callback) {

    // add the onclick button
    var closebtns = document.getElementsByClassName(className);

    // Loop all the menu items and add a event handler to them
    for(var a = 0; a < closebtns.length; a++) {

      // handle the menu item
      (function(close_btn_el){

        // add the handler that will handle a click on this elemtn
        close_btn_el.onclick = callback;

      }( closebtns[a] ));

    }

  };

  // done return the interface
  return obj;

})();