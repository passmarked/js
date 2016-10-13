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