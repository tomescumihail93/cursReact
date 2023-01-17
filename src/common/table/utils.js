import { orderBy } from "lodash";

const filterTableData = (list, value, key) => {
    if (value) {
        list = list.filter(user => user[key] === value);
    } else {
        list = list;
    }
    return list;
}

const orderTableData = (list, sortColumnName, sortOrder) => {
    return orderBy(list, [sortColumnName], [sortOrder]);
}

const paginateTableData = (list, selectedPage, pageSize) => {
    var pagedUsers = [];
    var entryPoint = pageSize * (selectedPage - 1);
    if (list.length) {
        for (let i = entryPoint; i < entryPoint + pageSize; i++) {
            if (list[i]) {
                pagedUsers.push(list[i]);
            }
        }
    }
    return pagedUsers
}


export { filterTableData, orderTableData, paginateTableData };