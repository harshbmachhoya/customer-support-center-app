export const baseURLs = {
    person: 'http://localhost:3000',
};

export const endpoints = {
    login:'/user/login',
    userList: '/user/list',
    updateUser:'/user/update',
    createUser:'/user/create',
    getRoles:'/user/role',
    caseList:'/case/list',
    createCase:'/case/create',
    resolveCase:'case/resolve'
};

export const defaultPageSize = 1;
export const defaultLimit = 10;
export const defaultRowsPerPage = [10, 20, 50, 100];