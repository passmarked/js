var UserProfile = (function(options) {

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
  * Returns the ID of the user
  **/
  obj.getID = function() {

    // return
    return obj.get('id');

  };

  /**
  * Returns the full name of the user
  **/
  obj.getName = function() {

    // return
    return obj.get('name');

  };

  /**
  * Returns the firstname of the user
  **/
  obj.getFirstname = function() {

    // return
    return obj.get('firstname');

  };

  /**
  * Returns the surname of the user
  **/
  obj.getLastname = function() {

    // return
    return obj.getSurname();

  };

  /**
  * Returns the surname of the user
  **/
  obj.getSurname = function() {

    // return
    return obj.get('surname');

  };

  /**
  * Returns the email of the user
  **/
  obj.getEmail = function() {

    // return
    return obj.get('email');

  };

  /**
  * Returns if the user is a Passmarked Admin
  **/
  obj.isAdmin = function() {

    // return
    return obj.get('admin') === true;

  };

  /**
  * Returns the created timestamp of the user
  **/
  obj.getCreated = function() {

    // return
    return obj.get('created');

  };

  /**
  * Returns the lastlogin timestamp of the user
  **/
  obj.getLastLogin = function() {

    // return
    return obj.get('lastlogin');

  };

  /**
  * Returns the lastupdated of the user
  **/
  obj.getLastUpdated = function() {

    // return
    return obj.get('lastupdated');

  };

  /**
  * Returns an array of connected accounts by the client
  **/
  obj.getAccounts = function() {

    // return
    return obj.get('accounts') || [];

  };

  // return the page
  return obj;

});