import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './navibar.css'

class Navibar extends React.Component {

  state = {
    expanded: false
  }
  
  render() {
    const { loggedIn, user, groupsForUser } = this.props
    return (
      <Navbar collapseOnSelect bg='dark' variant="dark" expand="lg" className='navbar'>
        <Navbar.Brand href="home" >On The Baize</Navbar.Brand>
        {loggedIn && <Navbar.Brand>{user.username}</Navbar.Brand>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="profile"
              onClick={(e) => this.navigateTo('profile', e)}
              disabled={!loggedIn}
            >Profile</Nav.Link>
            <NavDropdown
              title="Groups"
              id="nav-dropdown"
              disabled={!loggedIn}
            >
              {groupsForUser.length && groupsForUser.map((group, index) => {
                return (
                  <NavDropdown.Item
                    key={index}
                    onClick={(e) => this.selectGroupAndNavigate(group, e) }
                  >{group.name}</NavDropdown.Item>
                )
              })}
              <NavDropdown.Item
                onClick={ (e) => this.navigateTo('join-a-group', e) }
              >Join a group</NavDropdown.Item>
              <NavDropdown.Item
                onClick={ (e) => this.navigateTo('create-a-group', e) }
              >Create a group</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="competitions"
              onClick={(e) => this.navigateTo('competitions', e)}
              disabled={!loggedIn}
            >Competitions</Nav.Link>
            <Nav.Link
              href="stats"
              onClick={(e) => this.navigateTo('stats', e)}
              disabled={!loggedIn}
            >Stats</Nav.Link>
            <Nav.Link
              href='login'
              onClick={(e) => this.navigateTo('login', e)}
              disabled={loggedIn}
              active={!loggedIn}
            >Log In</Nav.Link>
            <Nav.Link
              href='signup'
              onClick={(e) => this.navigateTo('signup', e)}
              disabled={loggedIn}
              active={!loggedIn}
            >Sign Up</Nav.Link>
            <Nav.Link
              href='home'
              onClick={(e) => this.logOutAndNavigateTo('home', e)}
              disabled={!loggedIn}
              active={false}
            >Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  navigateTo = (path, e) => {
    e.preventDefault()
    this.props.history.push(`/${path}`)
  }

  logOutAndNavigateTo = (path, e) => {
    this.props.logOut()
    this.navigateTo(path, e)
  }

  selectGroupAndNavigate = (group, e) => {
    this.props.selectGroup(group)
    this.navigateTo('groups', e)
  }
}

export default Navibar
