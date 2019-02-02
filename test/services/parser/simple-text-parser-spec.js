import assert from 'assert'

import simpleTextParser from '../../../src/services/parser/simple-text-parser.js'
// Executing a tree would consist of parsing an array of actions
//
// The structure of the data has already been defined
// [
//   keyTap      => { type: 'tap', value: 'enter', modifier: [""] }
//   keyToggle   => { type: 'toggle', value: 'enter', event: "down/up", modifier: [""] }
//   typeString  => { type: 'text', text: 'enter', event: "send" }
// ]
describe('Simple Text Parser', function () {
  describe('has support for keys', function () {
    it('identifies a single key event', function () {
      // Arrange
      let expectation = {
        actions: [
        { type: 'key-tap', value: 'enter', modifier: [""] }
        ],
        complete: true
      }
      let speech = { text: "slap", complete: true }

      // Act
      simpleTextParser["addKey"]("slap", "key-tap", "enter")
      let parsingTree = simpleTextParser.parse(speech)
      // Assert
      assert.deepEqual(parsingTree, expectation);
    })

    it('separates events from text', function () {
      // Arrange
      let expectation = {
        actions: [
          { type: 'text', text: 'some text ' },
          { type: 'key-tap', value: 'enter', modifier: [""] },
          { type: 'text', text: ' something on a new line' }
        ],
        complete: true
      }
      let speech = { text: "some text slap something on a new line", complete: true }

      // Act
      simpleTextParser["addKey"]("slap", "key-tap", "enter")
      let parsingTree = simpleTextParser.parse(speech)

      // Assert
      assert.deepEqual(parsingTree, expectation);
    })
  });
})
