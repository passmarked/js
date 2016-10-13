var WidgetView = (function(opts) {

  // the object to return
  var obj = {};

  // the random UID to use for this session
  var randomUID         = utils.uuid();
  var namespace         = '';
  var paramMode         = opts.mode || 'page';
  var paramStyle        = (!opts.style);
  var report            = null;
  var enabledSections   = [];

  // set the namespace
  if(paramStyle === true) namespace = '-' + randomUID;

  /**
  * Renders the HTML to the element for the widget
  **/
  obj.render = function() {

    // the body of the space
    var body  = '';

    // the render locals
    var locals = {

      namespace: namespace

    };

    // check the mod
    if(paramMode === 'rules') {

      // render the actual widget
      locals.metaBox = templates['rules'](locals);

    } else {

      // render the actual widget
      locals.metaBox = templates['categories'](locals);

    }

    // add the styles
    body += templates['styles'](locals);

    // render the actual widget
    body += templates['box'](locals);

    /**
    * Create the element to add
    **/ 
    var element = document.createElement("div");

    // append the classes
    element.setAttribute('class', [

      'passmarked' + namespace + '-widget',
      'passmarked' + namespace + '-widget-' + paramMode

    ].join(' '));

    // set the HTML body
    element.innerHTML = body;

    // append to the list
    opts.el.appendChild(element);

  };

  /**
  * Switches sections
  **/
  obj.showSection = function(sections) {

    // loop the items
    var sectionEls = document.getElementsByClassName('passmarked' + namespace + '-widget-section');

    // loop the sections
    for(var a = 0; a < sectionEls.length; a++) {

      // handle the menu item
      (function(sectionEl){

        // section item
        var sectionKey = sectionEl.getAttribute('data-section') || '';

        // is this the section we are looking for ?
        if( sections.indexOf(sectionKey) === -1 ) {

          // hide ...
          sectionEl.style.display = 'none';

        } else {

          // show ...
          sectionEl.style.display = 'block';

        }

      }( sectionEls[a] ));

    }

  };

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
  * 
  **/
  obj.hasClass = function(ele,cls) {
    return ele && ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  };

  /**
  *
  **/
  obj.addClass = function(ele,cls) {
    if (ele && !hasClass(ele,cls)) ele.className += " "+cls;
  }

  /**
  *
  **/
  obj.removeClass = function(ele,cls) {
    if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  }

  /**
  * Updates the values on the meta details block
  **/
  obj.renderState = function(page) {

    utils.setInnerHTML('passmarked' + namespace + '-widget-domain-text', page.getURL());
    utils.setInnerHTML('passmarked' + namespace + '-widget-score', page.get('score'));

  };

  /**
  * Render the widget !
  **/
  obj.render();

  /**
  * Bind the form
  **/
  utils.onsubmit('passmarked' + namespace + '-widget-form', function(e) {

    // stop normal POST
    e.preventDefault();

    // get the blocking
    var addressField = document.getElementsByClassName('passmarked' + namespace + '-widget-address')[0];

    // create the report
    var report = Report({

      url:    addressField.value,
      token:  opts.token

    });

    report.on('update', function() {

      var page = report.getResult();
      if(page.getStatus() === 'pending') {

        // set as pending
        obj.showSection(['details']);

      } else if(page.getStatus() === 'running') {

        // set as running
        obj.showSection(['details']);

      } else if(page.getStatus() === 'testing') {

        // set the image if any
        var page = report.getResult();

        // set the image
        utils.forEach('passmarked' + namespace + '-widget-preview-img', function(img) {

          // set the image
          img.src = page.getPreview('desktop').url;
          img.style.display = 'block';

        })

        // set as testing
        obj.showSection(['details']);

      }

    });

    report.on('done', function() {

      // get the result
      var page = report.getResult();

      // set the details of the code
      obj.renderState(page);

      // start showing loading
      obj.showSection(['details']);

    });

    // start showing loading
    obj.showSection(['loading']);

    // start it
    report.start(function(err, code) {

      // get the result
      var page = report.getResult();

      // set the details of the code
      obj.renderState(page);

      // start showing loading
      obj.showSection(['details']);

      // check for a error
      if(err) {

        // start showing loading
        obj.showSection(['error']);

      } else if(code) {
        
        

      }


    });

    // stop the FALSE
    return false;

  });

  // load the loading page
  if(channel.isConnected() === true)
    obj.showSection(['main']);
  else
    obj.showSection(['loading']);

  // check if connected
  channel.on('close', function() {

    // done
    obj.showSection(['loading']);

  });

  // check if connected
  channel.on('open', function() {

    // done
    obj.showSection(['main']);

  });

  // done return the interface
  return obj;

});