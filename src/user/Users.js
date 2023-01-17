import React, { Component } from 'react'
import { users_json } from './user_data'
import User from './User';
import { filter, orderBy, take } from 'lodash'
import Table from '../common/table/Table';


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
    console.log(this.props)
    const { history } = this.props;
    // debugger;
    // const { users, onDelete, onAddTicket, onLiked, pageSize, selectedPage, selectedBloodGroup, sortColumnName, sortOrder, columns } = this.props;
    // // const {  } = this.state;

    // let bloodGroupCategories = Array.from(new Set(users.map(user => user.bloodGroup)));

    // let tableData = {
    //   columns: columns,
    //   sortable: true,
    //   sort: {
    //     sortColumnName: sortColumnName,
    //     sortOrder: sortOrder,
    //   },
    //   paginated: true,
    //   pagination: {
    //     pageSize: pageSize,
    //     selectedPage, selectedPage
    //   },
    //   filterValue: selectedBloodGroup,
    //   handlePageChange: this.handlePageChange,
    //   data: users,
    //   actions: [
    //     {
    //       label:"Delete",
    //       class: "btn btn-danger",
    //       actionHandler: () => {console.log("delete din actiuni dynamice")}
    //     },
    //     {
    //       label: "Add To Cart",
    //       class: "btn btn-success",
    //       actionHandler: () => {console.log("edit fro mcustom ")}
    //     }
    //   ]
    // };

    // debugger
    return (
      <div style={{display: "flex"}} className="mt-4">
        {/* <div className='m-4' style={{width: 100}}>
          <div>
            <ul class="list-group">
              {bloodGroupCategories.map(bloodGroup => (
              <li style={{cursor: "pointer", height: 50}} onClick={() => this.handleSelectedBloodGroup(bloodGroup)} className={bloodGroup === selectedBloodGroup ? "list-group-item active": "list-group"}>{bloodGroup}</li>
              ))}
            </ul>
          </div>
        </div> */}
        <div>
          USERS PAGE
        {/* <Table tableData={tableData} users={users} onLiked={onLiked} onAddTicket={onAddTicket} onDelete={onDelete}></Table> */}
        </div>
      </div>
    )
  }
}

export default Users;
