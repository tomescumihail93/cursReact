import React, { Component } from 'react'
import Pagination from './Pagination';
import { filter, orderBy, take } from 'lodash'
import { filterTableData, orderTableData, paginateTableData } from './utils';

class Table extends Component {

    computeLiked = (user) => {
        return user.iamDat === true ? "btn btn-success" : "btn btn-primary";
    }

    render() {
        const {tableData, onLiked, onAddTicket, onDelete, users} = this.props;
        const {paginated = false, sortable = false, actions, columns, selectedPage, sortColumnName, sortOrder, selectedBloodGroup, handlePageChange, pageSize} = tableData;
        debugger
        let filteredUsers = filterTableData(users, selectedBloodGroup, "bloodGroup")

        filteredUsers = sortable ? orderTableData(filteredUsers, sortColumnName, sortOrder): filteredUsers;

        let pagedUsers = paginateTableData(filteredUsers, selectedPage, pageSize);
        
        const numberOfPages = filteredUsers.length / pageSize;
        
        return (
        <>
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
                    {actions.map(action => (
                        <button onClick={() => action.actionHandler(user)} className={action.class}>{action.label} </button>
                    ))}
                    
                    {/* <button onClick={() => onAddTicket(user)} className='btn btn-secondary'>Adauga Bilet</button>
                    <button onClick={() => onDelete(user)} className='btn btn-danger'>Sterge</button> */}
                    </td>
                </tr>)
                })}
            </tbody>
            </table>
            {paginated && <Pagination
            selectedPage={selectedPage}
            nrOfPages={numberOfPages}
            onChangePage={handlePageChange}
            ></Pagination>}
        </>
        )
    }

}

export default Table