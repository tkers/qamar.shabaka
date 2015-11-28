// dependencies
var connect = require("connect");
var serveStatic = require("serve-static");
var path = require("path");

var dir = path.join(__dirname, "static");

var app = connect();
app.use(serveStatic(dir))
app.listen(4444);
