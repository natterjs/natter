// Libraries
import Parser from "simple-text-parser"
import formatter from "voca"


Parser.registerPreset("enter", /slap/);
Parser.registerPreset("ctrl+left", /lope/);

const parser = new Parser();

// Add a key
const addKey = (name, value) => {
  parser.addPreset(name, function(arg) {
    return { type: "key", value: value, text: "" }
  });
}

// Add a regular expression matcher, with a format function
const addFormat = (name, formatter) => {
  const pattern = name += "(.*)";
  const matcher = new RegExp(pattern,"ig");

  parser.addRule(matcher, function(tag, clean_tag) {
    return formatter(clean_tag)
  });
}

const sample = "slap camel foo bar lope camel new bar"

console.log(parser.render(sample));
console.log(parser.toTree(sample));

const parse = () => {
  let parsedData = parser.toTree(data.text)
  return parsedData
}

module.exports = {
  parse: parse,
  addKey: addKey,
  addFormat: addFormat
}
