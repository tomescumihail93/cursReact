import React, { Component } from 'react'
import { users_json } from './user_data'
import User from './User';
import Pagination from './Pagination';
import { orderBy } from 'lodash'


class Users extends Component {

  state = {
    pageSize: 7,
    selectedPage: 1,
    selectedBloodGroup: '',
    sortColumnName: '',
    sortOrder: 'asc',
    columns: [
      {
        label: "Nume",
        key: "name",
        sortable: true,
      },
      {
        label: "Grupa De Sange",
        key: "bloodGroup",
        sortable: true,
      },
      {
        label: "Email",
        key: "email",
        sortable: true,
      },
      {
        label: "Nr Likes",
        key: "nrLikes",
        sortable: false
      },
      {
        label: "Nr Bilete",
        key: "nrBilete",
        sortable: false,
      },
      {
        label: "Actiuni",
        key: "actiuni",
        sortable: false
      }
    ]
  }

  computeLiked = (user) => {
    // if(user.iamDat) return "btn btn-success";
    // if(!user.iamDat) return "btn btn-primary";
    return user.iamDat === true ? "btn btn-success" : "btn btn-primary";

  }

  handlePageChange = (page) => {
    const cpState = { ...this.state };
    cpState.selectedPage = page;
    this.setState(cpState)
  }

  handleSelectedBloodGroup = (bg) => {
    const cpState = {...this.state};
    cpState.selectedBloodGroup = bg;
    this.setState(cpState);
  }

  handleTableSort = (column) => {
    const cpState = {...this.state};
    if(column === cpState.sortColumnName) {
      cpState.sortOrder = cpState.sortOrder === "asc" ? "desc":"asc";
    }
    cpState.sortColumnName = column;
    this.setState(cpState);
  }
  render() {
    const { users, onDelete, onAddTicket, onLiked } = this.props;
    const { pageSize, selectedPage, selectedBloodGroup, sortColumnName, sortOrder, columns } = this.state;

    

    let filteredUsers = [];
    if(selectedBloodGroup.length) {
      filteredUsers = users.filter(user => user.bloodGroup === selectedBloodGroup);
    } else {
      filteredUsers = users;
    }

    filteredUsers = orderBy(filteredUsers, [sortColumnName], [sortOrder]);

    const numberOfPages = filteredUsers.length / pageSize;
    // users - 30 elemente
    // pageSize - 5 elemente
    // selectedPage - 4 Pagina
    var pagedUsers = [];
    var entryPoint = pageSize * (selectedPage - 1);
    if (filteredUsers.length) {

      for (let i = entryPoint; i < entryPoint + pageSize; i++) {
        if (filteredUsers[i]) {
          pagedUsers.push(filteredUsers[i]);
        }
      }
    }

    let bloodGroupCategories = Array.from(new Set(users.map(user => user.bloodGroup)));

    return (
      <div style={{display: "flex"}} className="mt-4">
        <div className='m-4' style={{width: 100}}>
          <div>
            <ul class="list-group">
              {bloodGroupCategories.map(bloodGroup => (
              <li style={{cursor: "pointer", height: 50}} onClick={() => this.handleSelectedBloodGroup(bloodGroup)} className={bloodGroup === selectedBloodGroup ? "list-group-item active": "list-group"}>{bloodGroup}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
        <table class="table">
          <thead>
            <tr>
              {columns.map(column => (<th onClick={() => column.sortable && this.handleTableSort(column.key)} scope="col">
                {column.label}
                {column.sortable && sortColumnName === column.key && <i class={ sortOrder === "asc" ? "fa-solid fa-arrow-up mx-2":"fa-solid fa-arrow-down mx-2"}></i>}
              </th>))}
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map(user => {
              return (<tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.bloodGroup}</td>
                <td>{user.email}</td>
                <td>{user.nrBilete}</td>
                <td>{user.nrLikes}</td>
                <td>
                  <button onClick={() => onLiked(user)} className={this.computeLiked(user)}>Like</button>
                  <button onClick={() => onAddTicket(user)} className='btn btn-secondary'>Adauga Bilet</button>
                  <button onClick={() => onDelete(user)} className='btn btn-danger'>Sterge</button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
        <Pagination
          selectedPage={this.state.selectedPage}
          nrOfPages={numberOfPages}
          onChangePage={this.handlePageChange}
        ></Pagination>
        </div>
      </div>
    )
  }
}

export default Users;
