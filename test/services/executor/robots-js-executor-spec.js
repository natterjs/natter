// Libraries
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon")

// Services
import robotJSExecutor from '../../../src/services/executor/robot-js-executor.js'

describe('Robot JS executor', function () {
  describe('execute tree', function () {
    it('single key-tap', function () {
      // Arrange
      let data = {
        actions: [
          { type: 'key-tap', value: 'enter', event: '', modifier: [""] }
        ],
        complete: true
      }

      let executions = {
        "key-tap": sinon.spy()
      }

      // Act
      robotJSExecutor.tree(data, executions)

      // Assert
      expect(executions["key-tap"].calledOnce).to.be.true;
      expect(executions["key-tap"].firstCall.args[0]).to.equal("enter");
      expect(executions["key-tap"].firstCall.args[1]).to.eql([""]);
    });

    it('single key-toggle', function () {
      // Arrange
      let data = {
        actions: [
          { type: 'key-toggle', value: 'enter', event: 'down', modifier: [""] }
        ],
        complete: true
      }

      let executions = {
        "key-toggle": sinon.spy()
      }

      // Act
      robotJSExecutor.tree(data, executions)

      // Assert
      expect(executions["key-toggle"].calledOnce).to.be.true;
      expect(executions["key-toggle"].firstCall.args[0]).to.equal("enter");
      expect(executions["key-toggle"].firstCall.args[1]).to.eql("down");
      expect(executions["key-toggle"].firstCall.args[2]).to.eql([""]);
    });

    it('single text', function () {
      // Arrange
      let data = {
        actions: [
          { type: 'text', text: 'some example text' }
        ],
        complete: true
      }

      let executions = {
        "text": sinon.spy()
      }

      // Act
      robotJSExecutor.tree(data, executions)

      // Assert
      expect(executions["text"].calledOnce).to.be.true;
      expect(executions["text"].firstCall.args[0]).to.equal("some example text");
    });
  });
})
