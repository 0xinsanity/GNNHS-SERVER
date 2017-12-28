
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = { top: 0, left: 0, width: 1024, height: 768 };
page.open('https://ic.greatneck.k12.ny.us/campus/portal/greatneck.jsp?status=portalLogoff&lang=en', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    page.evaluate(function() {
      var username_input = document.getElementById('username');
      var password_input = document.getElementById('password');
      username_input.setAttribute('value', 'sddhhanover');
      password_input.setAttribute('value', 'maya0123');
      document.getElementById('signinbtn').click();
    });
    page.evaulate(function() {
      
    });
    page.render('portal_logo.png');
  }
  phantom.exit();
});