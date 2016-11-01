# Javascript API

[Passmarked](http://passmarked.com) is a suite of tests that can be run against any page/website to identify issues with parity to most online tools in one package.

The [Terminal Client](http://npmjs.org/package/passmarked) is intended for use by developers to integrate into their workflow/CI servers but also integrate into their own application that might need to test websites and provide realtime feedback.

All of the checks on [Passmarked](http://passmarked.com) can be voted on importance and are [open-sourced](http://github.com/passmarked/suite), to encourage community involvement in fixing and adding new rules. We are building the living Web Standard and love any [contributions](#contributing).

## Installing

To install just add the library as part of your HTML:

```
<script src="//jsapi.passmarked.com/v1.js"></script>
```

The page will now have a global `passmarked` object that can be used

## Running a report with the API

```javascript
/**
* Create a report
**/
var report = passmarked.create({

  url:    'http://example.com',
  token:  '<token-here>'

});

/**
* Start the report
**/
report.start(function(err, code) {

  if(err) {
  
    /** Something with the network went terribly wrong **/
  
  } else if(code) {
  
    /** Validation code returned **/
    
  }

});

/**
* Listen when the report is done
**/
report.on('done', function() {

  // get the data
  var page = report.getResult();
  
  // output done !
  console.log('Page scored ' + page.getScore() + '!');
  
  // get the screenshot
  console.log('preview of desktop: ' + page.getPreview('desktop'));
  
  // check if a certain rule is broken
  if(page.hasRule('heartbleed')) {
  
    // output that the server is in trouble ...
    console.log('Server is vunerable to HeartBleed !');
  
  }

});
```

## Rules

Rules represent checks that occur in this module, all of these rules have a **UID** which can be used to check for specific rules. For the structure and more details see the [Wiki](https://github.com/passmarked/passmarked/wiki) page on [Rules](https://github.com/passmarked/passmarked/wiki/Create).

> Rules also include a `type` which could be `critical`, `error`, `warning` or `notice` giving a better view on the importance of the rule.

See [passmarked.com/library](https://passmarked.com/library) for all the rules.

## Contributing

```bash
git clone git@github.com:passmarked/js.git
npm install
gulp build / gulp watch
```

Pull requests have a prerequisite of passing tests. If your contribution is accepted, it will be merged into `develop` (and then `master` after staging tests by the team) which will then be deployed live to [passmarked.com](http://passmarked.com) and on NPM for everyone to download and test.

## About

To learn more visit:

* [Passmarked](http://passmarked.com)
* [Terminal Client](https://www.npmjs.com/package/passmarked)
* [Slack](http://passmarked.com/chat) - We have a Slack team with all our team and open to anyone using the site to chat and figure out problems. To join head over to [passmarked.com/chat](http://passmarked.com/chat) and request a invite.

## License

Copyright 2016 Passmarked Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
