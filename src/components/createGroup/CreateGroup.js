import React from 'react'
import { Form, Button } from 'react-bootstrap'
import './createGroup.css'

class CreateGroup extends React.Component {

    state = {
      
    }

  render() {
    return (
      <div className="createForm">
        <Form>
          <Form.Group controlId="groupName">
            <Form.Label>Group Name</Form.Label>
            <Form.Control placeholder="Enter a name for your group" />
            <Form.Text className="text-muted">
              Group name must be unique
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="textArea">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows="4" placeholder="A brief description of the group"/>
          </Form.Group>
          <Form.Group controlId="selectPrivacy">
          <Form.Label>Privacy</Form.Label>
            <Form.Control as="select">
              <option>Public (Allow people to apply to join)</option>
              <option>Private (Invitation only)</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Group
          </Button>
        </Form>
      </div>
    )
  }
}

export default CreateGroup
