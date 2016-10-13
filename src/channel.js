var channel = (function() {

  /**
  * Actual socket to keep listed
  **/
  var socket = null;

  /**
  * Channel object to expose
  **/
  var channel = Events();

  /**
  * The last timestamp of the last ping
  **/
  var lastPing = new Date().getTime();;

  /**
  * The current retry count
  **/
  var retryCount = 1;

  /**
  * Flag if we are open
  **/
  var openConnection = false;

  /**
  * Subscribe keys
  **/
  var subscribeKeys = [];

  /**
  * Handles trying to connect to the 
  * web socket servers
  **/
  channel.connect = function() {

    // open the connection
    socket = new WebSocket("ws://wss.passmarked.com/");

    // set the last ping
    lastPing = new Date().getTime();

    // get the message
    socket.onmessage = function(event) {

      // skip the data
      if(!event.data) return;

      // try to parse the data
      var params = null;

      // check it
      try {

        // set the params
        params = JSON.parse(event.data);

      } catch(err) {}

      // check the params
      if(!params) return;

      // debug
      log.debug('CHANNEL', 'Received a message: ' + event.data);

      // check if ping
      if(params.key === 'ping') {

        /// set the ping
        lastPing = new Date().getTime();

      } else if(params.key === 'welcome') {

        // ready here
        channel.emit('ready');

      }else {

        // send the message
        channel.emit('message', params);

      }

    };
    socket.onopen = function() {

      // debug
      log.debug('CHANNEL', 'Connection to websocket opened');

      // send out the message
      channel.emit('open');

      // reset it
      retryCount = 1;

      // set as connected
      openConnection = true;

      // send out all the keys again
      channel.resubscribe();

    };
    socket.onclose = function() {

      // debug
      log.debug('CHANNEL', 'Connection to server ended');

      // register close
      channel.close();

      // send out the message
      channel.emit('close');

    };
    socket.onerror = function(err) {

      // debug
      log.error('CHANNEL', 'Connection to server had a error', err);

      // register close
      channel.close();

      // send out the message
      channel.emit('error', err);

    };

  };

  /**
  * Returns if logged i
  **/
  channel.isConnected = function() {

    // check if connected
    return openConnection === true;

  };

  /**
  * Loops and subscribes to all the keys
  **/
  channel.resubscribe = function() {

    // subscribe again
    for(var i = 0; i < subscribeKeys.length; i++) {

      // add it
      channel.subscribe(subscribeKeys[i]);

    }

  };

  /**
  * Subscribe to events
  **/
  channel.subscribe = function(key) {

    // add to the list
    if(subscribeKeys.length > 0 && 
        subscribeKeys.indexOf(key) === -1) {
      
      // add the key
      subscribeKeys.push(key);

    }

    // send the data over
    socket.send(JSON.stringify({

      "key": key

    }))

  };

  /**
  * The connection was closed
  **/
  channel.closed = function() {

    // set as closed
    openConnection = false;

    // kill the connection
    delete socket;
    socket = null;

    // retry after retry seconds seconds
    setTimeout(function() {

      // increment the retry
      retryCount++;

      // should not be bigger than 15
      if(retryCount > 15) retryCount = 15;

      // try to connect again
      channel.connect();

    }, retryCount * 1000);

  };

  /**
  * Close the connection
  **/
  channel.close = function() {

    // close the connection
    if(socket) {

      // close it
      try {

        // close it
        socket.close();

      } catch(err) {}

    }

    // close it
    channel.closed();

  };

  /**
  * Checks every 10 seconds if the last ping
  * is not more than 40 seconds ago
  **/
  setInterval(function() {

    // check if connected
    if(openConnection === false) return;

    // check last time of the date
    if(new Date().getTime() - lastPing > 40 * 1000) {

      // disconnect !
      channel.close();

    }

  }, 1000 * 10);

  // connect !
  channel.connect();

  return channel;

})();