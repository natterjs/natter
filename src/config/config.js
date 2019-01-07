// Config will perform CRUD on the setttings file
//
// Config functions should be exported

// Libraries
const fs = require("fs");

let contents = fs.readFileSync("src/config/settings.json");
let settings = JSON.parse(contents);

module.exports = settings
