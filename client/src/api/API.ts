import { AxiosResponse } from 'axios';
import { endpoints } from '../constants/api.constant';
import { ILogin, IRoles, IUser } from '../interfaces/user';
import { apiQuery } from '../utils/apiQuery';
import { ICase } from '../interfaces/case';

// User APIs
export const userAPI = {
    login: async (req: ILogin): Promise<AxiosResponse<any, any>> => {
        const data = await apiQuery.post(`${endpoints.login}`, { ...req })
        return data;
    },
    getUserList: async (): Promise<IUser[]> => {
        const { data: { users } } = await apiQuery.get(endpoints.userList);
        return users;
    },
    createUser: async (req: IUser): Promise<void> => {
        const { data } = await apiQuery.post(`${endpoints.createUser}`, { ...req });
        return data;
    },
    updateUser: async (userId: string, reqBody: IUser): Promise<void> => {
        const { data } = await apiQuery.put(`${endpoints.updateUser}?userId=${userId}`, { ...reqBody });
        return data;
    },
    getRoles: async (): Promise<IRoles[]> => {
        const { data: { roles } } = await apiQuery.get(endpoints.getRoles);
        return roles;
    },
};

// Case APIs
export const caseAPI = {
    getCaseList: async (): Promise<ICase[]> => {
        const { data: { cases } } = await apiQuery.get(endpoints.caseList);
        return cases;
    },
    createCase: async (req: ICase): Promise<Promise<AxiosResponse<any, any>>> => {
        const data = await apiQuery.post(`${endpoints.createCase}`, { ...req });
        return data;
    },
    resolveCase: async (caseId: string): Promise<any> => {
        const { data } = await apiQuery.put(`${endpoints.resolveCase}?caseId=${caseId}`);
        return data;
    },
};
