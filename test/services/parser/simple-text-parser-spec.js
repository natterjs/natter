var assert = require('assert');

var simpleTextParser = '../../../src/services/parser/simple-text-parser.js'

describe('Testing string parsing', function () {
 it('should allow setting rules for keys', function () {
      // Arrange
      var parser = simpleTextParser["addKey"]("slap", "enter")
      // Act
      var speech = "slap"
      var parsedTree = simpleTextParser.parser(speech)
      // Assert
      var expectation = [{ type: 'key', value: 'enter', text: '' }]
      assert.equal(parsedTree, expectation);
    });
})
