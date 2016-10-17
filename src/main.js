var passmarkedClient = (function(){

  /**
  * The final resulting output
  **/
  var params = {};

  /**
  * The output to send back out
  **/
  var output = {

    links: []

  };

  /**
  * the internal API to expose
  **/
  var client = {};

  /**
  * Set the item
  **/
  client.enableLogging = function() {

    // set it
    log.enableLogging();

  };

  /**
  * Internal function that receives the data from the JS
  **/
  client.receivePayload = function(payload) {

    // set the params
    params = payload;

  };

  /**
  * Returns the final output returned from the server
  **/
  client.getPayload = function() { return output; };

  /**
  * Returns the list of occurrences according to report
  **/
  client.getOccurrences = function(options, fn) {

    // do the request
    api.getOccurrences(options, function(err, response) {

      // do the request
      if(err) {

        // return the error instead
        return fn(err);

      } else if(!response) {

        // return a generic error
        return fn(new Error('Could not parse a response'));

      } else {

        // final list of objects to return
        var items = [];

        // loop the resulting items and create objects
        for(var i = 0; i < (response.items || []).length; i++) {

          // add each model 
          items.push( Occurrence(response.items[i]) )

        }

        // return the items
        return fn(null, items);

      }

    });

  };

  /**
  * Returns the list of issues according to report
  **/
  client.getIssues = function(options, fn) {

    // do the request
    api.getIssues(options, function(err, response) {

      // do the request
      if(err) {

        // return the error instead
        return fn(err);

      } else if(!response) {

        // return a generic error
        return fn(new Error('Could not parse a response'));

      } else {

        // final list of objects to return
        var items = [];

        // loop the resulting items and create objects
        for(var i = 0; i < (response.items || []).length; i++) {

          // add each model 
          items.push( Issue(response.items[i]) )

        }

        // return the items
        return fn(null, items);

      }

    });

  };

  /**
  * Returns the user from the current token
  **/
  client.getUser = function(options, fn) {

    // do the request
    api.getUser(options, function(err, response) {

      // do the request
      if(err) {

        // return the error instead
        return fn(err);

      } else if(!response) {

        // return a generic error
        return fn(new Error('Could not parse a response'));

      } else {

        // return the final model
        return fn(null, UserProfile(response.item || {}));

      }

    });

  };

  /**
  * Returns the balance for the current token
  **/
  client.getBalance = function(options, fn) {

    // do the request
    api.getBalance(options, function(err, response) {

      // do the request
      if(err) {

        // return the error instead
        return fn(err);

      } else if(!response) {

        // return a generic error
        return fn(new Error('Could not parse a response'));

      } else {

        // return the final model
        return fn(null, Balance(response.item || {}));

      }

    });

  };

  /**
  * Returns the balance for the current token
  **/
  client.getReport = function(options, fn) {

    // do the request
    api.getReport(options, function(err, response) {

      // do the request
      if(err) {

        // return the error instead
        return fn(err);

      } else if(!response) {

        // return a generic error
        return fn(new Error('Could not parse a response'));

      } else {

        // return the final model
        return fn(null, Page(response.item || {}));

      }

    });

  };

  /**
  * Starts a report
  **/
  client.create = function(options) {

    // return the response
    return Report(options);

  };

  /**
  * Starts a report
  **/
  client.createWidget = function(options) {

    // create and return the widget
    return WidgetView(options);

  };

  /**
  * Adds a link that the crawler can also crawl
  **/
  client.addLink = function(href) {

    // only allow 20 new pages
    if(output.links.length >= 20) return;

    // add the link
    if(output.links.indexOf(href) === -1) 
      output.links.push(href);

  };

  /**
  * Returns the exposed client
  **/
  return client;

})();

// attach this to the window
if(window) window.passmarked = passmarkedClient;