// init project
var express = require('express');
var app = express();

app.get("/:file", function (request, response) {
  response.sendFile(__dirname + '/'+request.params.file);
});