import { useQuery, UseQueryResult } from 'react-query';
import { userAPI } from '../../../api/userAPI';
import { endpoints } from '../../../constants/api.constant';
import { IUser } from '../../../interfaces/user';

export const useFetchAgentList = (
): UseQueryResult<IUser[]> =>
    useQuery(endpoints.userList, () => userAPI.getUserList(), {
        retry: false,
        retryOnMount: false,
        refetchOnWindowFocus: false,
        enabled: false,
        onSuccess: (res) => res,
        onError: (error: Error) => error,
    });
