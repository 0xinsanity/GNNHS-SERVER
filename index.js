// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

//var databaseUri = 'mongodb://admin:Cyoteam1532@ds053206.mlab.com:53206/gnnhs-server';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || '5LA5kojEziCljqw4vZ9iZGNRQXwaOJG0jmcQaLYY',
  push: {
    ios: [
      {
        pfx: __dirname + '/aps.p12',
        passphrase: 'cyoteam1b',
        bundleId: 'net.hanovernoah.GNNHS',
        production: false
      }
    ]
  },
  masterKey: process.env.MASTER_KEY || '3DerL7gs4rHTdd2eaya6GjHGpP27tbtSpyqSlGMw', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["ClubChoice", "Alerts"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Hi, how are you doing?');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
/*app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});*/

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
