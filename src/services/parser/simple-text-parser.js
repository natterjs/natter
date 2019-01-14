// Libraries
var Parser = require("simple-text-parser");
var formatter = require('voca');


Parser.registerPreset("enter", /slap/);
Parser.registerPreset("ctrl+left", /lope/);

var parser = new Parser();

parser.addPreset("enter", function(lope) {
  return { type: "key", value: "enter", text: '' }
});

parser.addPreset("ctrl+left", function(lope) {
  return { type: "key", value: "ctrl+left", text: '' }
});

parser.addRule(/camel(.*)/ig, function(tag, clean_tag) {
  return formatter.camelCase(clean_tag)
});

var sample = "slap camel foo bar lope camel new bar"

console.log(parser.render(sample));
console.log(parser.toTree(sample));
