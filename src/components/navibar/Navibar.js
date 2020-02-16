import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import './navibar.css'

function Navibar() {
  return (
    <Navbar bg='dark' variant="dark" expand="lg" className='navbar'>
      <Navbar.Brand href="home" >On The Baize</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="profile" >Profile</Nav.Link>
          <Nav.Link href="competitions" >Competitions</Nav.Link>
          <Nav.Link href="stats" >Stats</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

// const styles = {
//   link: {
//     color: '#1f4ac0',
//     fontSize: '200%',
//     fontWeight: '700'
//   },
//   brand: {
//     color: '#03440c',
//     fontSize: '400%',
//     fontWeight: '700'
//   }
// }
export default Navibar
