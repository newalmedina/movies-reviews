import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

//components
import AddReview from './components/add-review'
import MoviesList from './components/movies.list'
import Movie from './components/movie'
import Login from './components/login'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  const [user, setUser] = React.useState(null)
  async function login(user = null) {
    setUser(user)
  }
  async function logout(user = null) {
    setUser(null)
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link >
              <Link to={"/movies"} >Movies</Link>
            </Nav.Link>
            <Nav.Link >
              {user ?
                (
                  <a onClick={logout}>Logout user</a>
                ) : (
                  <Link to={"/login"} >login</Link>
                )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
