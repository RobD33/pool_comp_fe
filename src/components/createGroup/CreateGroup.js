import React from 'react'
import { Form, Button } from 'react-bootstrap'
import './createGroup.css'
import { createGroup, getGroups } from '../../utils/connections/groups'

class CreateGroup extends React.Component {

    state = {
      name: '',
      description: '',
      privacy: '',
      uniqueName: true,
      groups: [],
      loaded: false
    }

  render() {
    return (
      <div className="createForm">
        <Form>
          <Form.Group controlId="groupName">
            <Form.Label>Group Name</Form.Label>
            <Form.Control 
              placeholder="Enter a name for your group"
              onChange={this.handleNameChange}
              value={this.state.name}
            />
            <Form.Text className="text-muted">
              {this.state.uniqueName ? "" : "Group name must be unique"}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="textArea">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea"
              rows="4"
              placeholder="A brief description of the group"
              onChange={this.handleDescriptionChange}
              value={this.state.description}
            />
          </Form.Group>
          <Form.Group controlId="selectPrivacy">
          <Form.Label>Privacy</Form.Label>
            <Form.Control
              as="select"
              onChange={this.handlePrivacyChange}
              value={this.state.privacy}
            >
              <option value="public_group">Public (Allow people to apply to join)</option>
              <option value="private_group">Private (Invitation only)</option>
            </Form.Control>
          </Form.Group>
          <Button 
            variant="primary"
            type="submit"
            disabled={!this.state.uniqueName}
            onClick={this.submit}
          >
            Create Group
          </Button>
        </Form>
      </div>
    )
  }

  handleNameChange = (e) => {
    const name = e.target.value
    this.checkName(name)
    this.setState({ name })
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handlePrivacyChange = (e) => {
    const privacy = e.target.value
    this.setState({
      privacy
    })
  }
  
  submit = (e) => {
    e.preventDefault()
    const { name, description, privacy } = this.state
    if(this.state.uniqueName) {
      createGroup( name, description, privacy)
        .then(() => this.groupCreated())
    }
  }

  checkName = (name) => {
    const uniqueName = !this.state.groups.includes(name) && name !== ''
    this.setState({ uniqueName })
  }

  groupCreated = () => {

  }

  componentDidMount = () => {
    getGroups()
      .then(groups => {
        const loaded = true
        this.setState({ groups, loaded })
      })
  }
}

export default CreateGroup
