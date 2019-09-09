import React from 'react'
import { Container, Form } from 'semantic-ui-react'

export default class Keyboard extends React.Component {
  render() {
    const { keyboard } = this.props

    // Render fields in a collection as a row
    const renderFormRows = (myObject) => {
      const fields = formFields(myObject)
      const columnCount = 4
      const formRows = []
      for (let index = 0; index < fields.length; index += columnCount) {
        let rows = fields.slice(index, index + columnCount)

        formRows.push(
          <Form.Group widths='equal'>
            { rows }
          </Form.Group>
        )
      }

      return formRows
    }

    // Marshall the keyboard into an array of fields
    const formFields = (myObject) => {
      return Object.keys(myObject).map((key, index) => {
        let character = myObject[key]
        let spec = key
        return <Form.Input tiny value={spec} label={character} type='text' />
      })
    }

    return (
      <Container>
        <Form tiny onSubmit={this.handleSubmit}>
          { renderFormRows(keyboard.keys) }
        </Form>
      </Container>
    )
  }
}
