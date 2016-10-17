var api = (function() {

  var api = {};

  /**
  * Creates a report with the given properties
  **/
  api.submit = function(options, fn) {

    // submit
    api.request({

      url:      '/v2/reports',
      method:   'post',
      data:     options

    }, fn);

  };

  api.stringify = function(params) {

    // array of objects to return
    var queryParams = [];

    // loop all the keys
    for(var key in params) {

      // add to list
      queryParams.push([

        encodeURIComponent(key),
        encodeURIComponent(params[key])

      ].join('='))

    }

    // return if any ?
    if(queryParams.length > 0) {

      // return the list
      return '?' + queryParams.join('&');

    } else {

      // return nothing
      return '';

    }
          
  }

  /**
  * Returns common tracking properties for requests
  **/
  api.getClientInfo = function() {

    // add the items
    var opts = {};

    // add the source
    if(window.document && 
        window.document.location)
          opts.source = document.location.href

    // add the app
    opts.client   = 'passmarked.js';
    opts.app      = 'passmarked.js';

    // add the user agent
    if(window.navigator && 
        window.navigator.userAgent)
          opts.useragent = navigator.userAgent;

    // done
    return opts;

  }; 

  /**
  * Does a actual CORS request over to the API
  **/
  api.request = function(options, fn) {

    // get the tracking properties
    var clientInfo = api.getClientInfo();

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

    // add to query string
    var queryString = api.stringify(utils.merge(

      !options.method || options.method === 'get' ? clientInfo : {},  
      options.query   || {}

    ));

    // create the request
    var request = new XMLHttpRequest();

    // get the href
    var href = options.url + queryString;

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

      // add the source
      var data = utils.merge(clientInfo, options.data)

      // make the actual request
      request.send(JSON.stringify(data || {}));

    } else {

      // make the actual request
      request.send();

    }
    

  };

  /**
  * Returns the list of occurrenes
  **/
  api.getOccurrences = function(params, fn) {

    // submit
    api.request({

      url:      '/v2/reports/' + params.report + '/occurrences',
      method:   'get',
      query:    params

    }, fn);

  };

  /**
  * Returns the list of available websites
  * for the token
  **/
  api.getIssues = function(params, fn) {

    // submit
    api.request({

      url:      '/v2/reports/' + params.report + '/issues',
      method:   'get',
      query:    params

    }, fn);

  };

  /**
  * Returns the list of available websites
  * for the token
  **/
  api.getWebsites = function(params, fn) {

    // submit
    api.request({

      url:      '/v2/websites',
      method:   'get',
      query:    params

    }, fn);

  };

  /**
  * Returns the available credits for the current token
  **/
  api.getBalance = function(params, fn) {

    // submit
    api.request({

      url:      '/v2/balance',
      method:   'get',
      query:    params

    }, fn);

  };

  /**
  * Returns the user from the current token
  **/
  api.getUser = function(params, fn) {

    // submit
    api.request({

      url:      '/v2/user',
      method:   'get',
      query:    params

    }, fn);

  };

  /**
  * Returns the report with the specified UID
  **/
  api.getReport = function(params, fn) {

    // submit
    api.request({

      url:      '/v2/reports/' + params.uid,
      method:   'get'

    }, fn);

  };

  return api;

})();