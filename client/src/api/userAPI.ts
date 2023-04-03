import { endpoints } from '../constants/api.constant';
import { IRoles, IUser } from '../interfaces/user';
import { apiQuery } from '../utils/apiQuery';

export const userAPI = {
    getUserList: async (): Promise<IUser[]> => {
        const { data: {  users } } = await apiQuery.get(endpoints.userList);
        console.log(users);
        
        return users;   
    },
    post: async (req: IUser): Promise<void> => {
        console.log('REQUEST',req);
        
        const { data } = await apiQuery.post(`${endpoints.createUser}`, { ...req });
        console.log(data)
        return data;
    },
    updateUser: async (userId: string): Promise<void> => {
        const { data } = await apiQuery.put(`${endpoints.updateUser}?userId=${userId}`);
        return data;
    },
    getRoles:async (): Promise<IRoles[]> => {
        const { data: {  roles } } = await apiQuery.get(endpoints.getRoles);
        console.log(roles);
        
        return roles;   
    },
};
