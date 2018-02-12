var express = require('express');

var app = express();

app.use(express.static('build'));
app.listen(3000, function() {
  console.log('Express server is up on port 3000');
});
