// Initialize module dependencies
var express = require('express');
var app = express();

// Routes
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Begin server
app.listen(3000);

