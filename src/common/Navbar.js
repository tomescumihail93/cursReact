import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <p>Nr utilizatori: {this.props.users.length}</p>
            <Link to="sports">Sports</Link>
            <Link to="users">Users</Link>
            {/* <a href="/sports">Sports</a>
            <a href="/users">Users</a> */}
        </nav>
    )
  }
}