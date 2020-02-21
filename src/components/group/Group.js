import React from 'react'
import './group.css'
import { getGroup } from '../../utils/connections/groups'

class Group extends React.Component {
  state = {
    group: null
  }

  render() {
    
    return this.state.group ?
    (
      <div className="groupWindow">
        <h1>{this.state.group.name}</h1>
        <label>{this.state.group.description}</label>
      </div>
    )
    :
    (<div className="groupWindow">Select a group</div>)
  }

  componentDidMount = () => {
    const { selectedGroup } = this.props
    if(selectedGroup) {
      this.fetchGroup(selectedGroup.name)
    }
  }
  
  componentDidUpdate = (prevProps) => {
    const { selectedGroup } = this.props
    if(selectedGroup && selectedGroup !== prevProps.selectedGroup) {
      this.fetchGroup(selectedGroup.name)
    }
  }

  fetchGroup = (groupname) => {
    getGroup(groupname)
        .then(group => {
          this.setState({ group })
        })
  }
}

export default Group
