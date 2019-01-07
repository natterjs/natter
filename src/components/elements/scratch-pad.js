import React from 'react'
import { Form, TextArea, Card, Button, Header } from 'semantic-ui-react'

const ScratchPad = () => (
  <Card fluid>
    <Card.Content>
      <Header floated={'left'}>Scratch Pad!</Header>
      <Button negative floated={'right'}>Clear</Button>
    </Card.Content>
    <Card.Content extra>
      <Form>
        <TextArea placeholder='Test your voice Recognition' autoHeight />
      </Form>
    </Card.Content>
  </Card>
)

export default ScratchPad
