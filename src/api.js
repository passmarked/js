var api = (function() {

  var api = {};

  /**
  * Creates a report with the given properties
  **/
  api.submit = function(options, fn) {

    // add the source
    if(!options.source)
      options.source = document.location.href

    // add the app
    if(!options.app)
      options.app = 'passmarked.widget';

    // add the user agent
    if(!options.useragent && 
        navigator && 
          navigator.userAgent)
            options.useragent = navigator.userAgent;

    // submit
    api.request({

      url:      '/v2/reports',
      method:   'post',
      data:     options

    }, fn);

  };

  /**
  * Does a actual CORS request over to the API
  **/
  api.request = function(options, fn) {

    // flag if we have already done the callback
    var callbackCalled = false;

    // the callback wrapper
    var callback = function(err, response) {

      // check if already called ?
      if(callbackCalled === true) return;

      // mark as done
      callbackCalled = true;

      // check if applied
      if(!fn) return;

      // return the info
      fn(err, response)

    };

    // create the request
    var request = new XMLHttpRequest();

    // get the href
    var href = '' + options.url;

    // check the href
    if(href.indexOf('http') !== 0) {

      // add the base
      href = 'https://api.passmarked.com' + href;

    }

    // open up a connection
    request.open((options.method || 'get').toLowerCase(), href, true);

    // set as JSON
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // wait till done loaded
    request.onload = function() {

      // Success!
      var data  = null;
      var err   = null;

      // try to parse
      try {

        // parse as data
        data = JSON.parse(request.responseText);

      } catch(error) { err = error; }

      // done
      callback(err, data);

    };

    request.onerror = function(err) {

      // send out the error
      callback(err);

    };

    // set the data to send
    if(options.data) {

      // make the actual request
      request.send(JSON.stringify(options.data || {}));

    } else {

      // make the actual request
      request.send();

    }
    

  };

  /**
  * Returns the report with the specified UID
  **/
  api.getReport = function(uid, fn) {

    // submit
    api.request({

      url:      '/v2/reports/' + uid,
      method:   'get'

    }, fn);

  };

  return api;

})();