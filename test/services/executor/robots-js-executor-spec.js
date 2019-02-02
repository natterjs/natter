import assert from 'assert'

import robotJSExecutor from '../../../src/services/executor/robot-js-executor.js'

describe('Robot JS executor', function () {
 it('Should invoke the correct commands when passing a tree', function () {
    // Arrange
    const firstTree = [{ type: 'key', value: 'enter', event: "press" }]
    const secondTree = [
      { type: 'key-tap', value: 'up', event: "toggle", modifier: ["control"] },
      { type: 'key-tap', value: 'enter', event: "press" }
    ]

    // Act
    const firstParsingTree = robotJSExecutor.tree(firstTree)
    const secondParsingTree = robotJSExecutor.tree(secondTree)

    // Assert
    // assert.deepEqual(firstParsingTree, firstExpectation);
    // assert.deepEqual(secondParsingTree, secondExpectation);
  });
})
