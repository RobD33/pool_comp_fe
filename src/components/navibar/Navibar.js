import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './navibar.css'

function Navibar({loggedIn, user, logOut, history, userGroups, selectGroup }) {

  const navigateTo = (path, e) => {
    e.preventDefault()
    history.push(`/${path}`)
  }

  const logOutAndNavigateTo = (path, e) => {
    logOut()
    navigateTo(path, e)
  }

  const selectGroupAndNavigate = (group, e) => {
    selectGroup(group)
    navigateTo('groups', e)
  }

  return (
    <Navbar collapseOnSelect bg='dark' variant="dark" expand="lg" className='navbar'>
      <Navbar.Brand href="home" >On The Baize</Navbar.Brand>
      {loggedIn && <Navbar.Brand>{user.username}</Navbar.Brand>}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            href="profile"
            onClick={(e) => navigateTo('profile', e)}
            disabled={!loggedIn}
          >Profile</Nav.Link>
          <NavDropdown
            title="Groups"
            id="nav-dropdown"
            disabled={!loggedIn}
          >
            {userGroups.map(group => {
              return (
                <NavDropdown.Item
                  onClick={(e) => selectGroupAndNavigate(group, e) }
                >{group}</NavDropdown.Item>
              )
            })}
            <NavDropdown.Item
              onClick={ (e) => navigateTo('join-a-group', e) }
            >Join a group</NavDropdown.Item>
            <NavDropdown.Item
              onClick={ (e) => navigateTo('create-a-group', e) }
            >Create a group</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            href="competitions"
            onClick={(e) => navigateTo('competitions', e)}
            disabled={!loggedIn}
          >Competitions</Nav.Link>
          <Nav.Link
            href="stats"
            onClick={(e) => navigateTo('stats', e)}
            disabled={!loggedIn}
          >Stats</Nav.Link>
          <Nav.Link
            href='login'
            onClick={(e) => navigateTo('login', e)}
            disabled={loggedIn}
            active={!loggedIn}
          >Log In</Nav.Link>
          <Nav.Link
            href='signup'
            onClick={(e) => navigateTo('signup', e)}
            disabled={loggedIn}
            active={!loggedIn}
          >Sign Up</Nav.Link>
          <Nav.Link
            href='home'
            onClick={(e) => logOutAndNavigateTo('home', e)}
            disabled={!loggedIn}
            active={false}
          >Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navibar
