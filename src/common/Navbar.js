import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <p>Nr utilizatori: {this.props.users.length}</p>
        </nav>
    )
  }
}