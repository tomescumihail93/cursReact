import React from 'react'

const Pagination = ({selectedPage, nrOfPages, onChangePage}) => {
    let pageArray = [];
    for(let i = 0; i <nrOfPages; i++) {
        pageArray.push(i+1)
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pageArray.map((page, index) => {
                 return <li onClick={() => onChangePage(page)} className={page === selectedPage ? "page-item active" :"page-item"}><a className="page-link" href="#">{page}</a></li>    
                })}
            </ul>
        </nav>
    )
}

export default Pagination;