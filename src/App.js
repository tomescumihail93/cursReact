import logo from './logo.svg';
import './App.css';
import Users from './user/Users';
import Navbar from './common/Navbar';
import React from 'react';
import { users_json } from './user/user_data';

class App extends React.Component {
  state = { 
    users: []
  }

  handleDelete = (user) => {
    console.log("delete user", user);
    let cpUsers = [...this.state.users];
    cpUsers = cpUsers.filter(userInitial => userInitial.id !== user.id);
    console.log(cpUsers.length, this.state.users.length)
    this.setState({...this.state, users: cpUsers});
  }

  handleAddTicket = (user) => {
    const cpUsers = [...this.state.users];
    const index = cpUsers.map(user => user.id).indexOf(user.id);
    cpUsers[index].nrBilete += 1;
    this.setState({...this.state, users: cpUsers});
  }

  handleUserLike = (user) => {
    const cpUsers = [...this.state.users];
    const index = cpUsers.map(user => user.id).indexOf(user.id);
    if(cpUsers[index].iamDat === true) {
      cpUsers[index].iamDat = false;
      cpUsers[index].nrLikes = cpUsers[index].nrLikes - 1;
    } else if(cpUsers[index].iamDat === false) {
      cpUsers[index].iamDat = true;
      cpUsers[index].nrLikes = cpUsers[index].nrLikes + 1;
    }
    this.setState({...this.state, users: cpUsers});
    
  }

  reset = () => {
    this.setState({...this.state, users: users_json.map(user => {
      user.nrBilete = 0;
      return user})})
  }

  componentDidMount = () => {
    console.log("Componenta s-a montat (render executat)");
    fetch('https://dummyjson.com/users')
    .then((response) => response.json())
    .then((data) => {
      const users = data.users.map(user => {
        user.avatar = user.image;
        user.name = user.firstName + " " + user.lastName;
        user.nrBilete = 0;
        user.nrLikes =  0;
        user.iamDat = false;
        return user
        });
      this.setState({...this.state, users: users});
      
      console.log("userii au ajuns")
    });
    console.log("s-a terminat did Mount")
  }

  componentDidUpdate = (prevProps, prevState) => {

    // console.log("prev props", prevProps);
    console.log("prev state", prevState);
    console.log("state", this.state);
  }

  render() {
    console.log("S-au generat elementele html react")
  const {users} = this.state; 
   return (
    <div className="App">
      <Navbar users={users}></Navbar>
      <Users users={users} onDelete={this.handleDelete} onAddTicket={this.handleAddTicket} onLiked={this.handleUserLike}></Users>
    </div>
  );
   }
}

export default App;
