"use strict";
const PORT = 4444;

// dependencies
const connect = require("connect");
const serveStatic = require("serve-static");
const path = require("path");

const dir = path.join(__dirname, "static");

const app = connect();
app.use(serveStatic(dir))
app.listen(PORT);
