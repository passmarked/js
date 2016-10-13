var Report = (function(options) {

  /**
  * Params data we got
  **/
  var params = {};
  var tests = [];
  var issues = [];

  /**
  * obj object to expose
  **/
  var obj = Events();

  /**
  * Returns the result
  **/
  obj.getResult = function() {

    // return the page model
    return Page(utils.merge({}, params, {

      issues: issues,
      tests:  tests

    }));

  };

  /**
  * A message was received
  **/
  obj.handleMessage = function(data) {

    // check if this report
    if(data.key !== 'report.' + params.uid)
      return;

    // get the item
    var item = data.item;

    // check the event type
    if(data.event === 'issue') {

      // register issue
      obj.onIssue(item);

    } else if(data.event === 'page') {

      // update the page details
      params = utils.merge({}, params, item);

      // call the event
      obj.onPageUpdate(item);

    } else if(data.event === 'test') {

      // flag if we found the test
      var foundTestEvent = false;

      // loop the events
      for(var i = 0; i < tests.length; i++) {

        // check if the key and category matches
        if(tests[i].key === item.key) {

          // update
          tests[i] = params.tests;

          // mark as found
          foundTestEvent = true;

          // stop here
          break;

        }

      }

      // did we find it ?
      if(foundTestEvent === false) {

        // add to the list
        params.tests.push(data.item);

      }

    }

  };

  /**
  * Handles trying to connect to the 
  * web socket servers
  **/
  obj.start = function(fn) {

    // check the url starts with http:// or https://
    if(options.url.toLowerCase().indexOf('http://') !== 0 && 
        options.url.toLowerCase().indexOf('https://') !== 0) {

      // add the default protocol
      options.url = 'http://' + options.url;

    }

    // send the request
    api.submit(options, function(err, response) {

      // check for a error
      if(err) return fn(err);

      // check if we got a response ... ?
      if(!response) return fn(new Error('No response from API'));

      // check the response
      if(response.status === 'ok') {

        // get the item 
        var item = response.item;

        // set the params
        params = item;

        // subscribe it
        channel.subscribe('report.' + params.uid);

      }

      // check the function
      fn(null, response.code || null);

    });

  };

  /**
  * Called when the report receives a update
  **/
  obj.onPageUpdate = function() {

    // emit the page details
    obj.emit('update');

    // check if done
    if(params.status === 'done') {

      // run onDone
      obj.onDone();

    }

  };

  /**
  * Called when the report is done
  **/
  obj.onDone = function() {

    // output done
    obj.emit('done');

    // remove main message handler
    channel.off('message', obj.handleMessage);

    // run reset to remove events
    obj.reset();

  };

  /**
  * Called when we receive a issue
  **/
  obj.onIssue = function(issue) {

    // update the page details
    issues.push(issue)

    // emit the issue
    obj.emit('issue', issue);

  };

  /**
  * 
  **/
  channel.on('message', obj.handleMessage);

  return obj;

});