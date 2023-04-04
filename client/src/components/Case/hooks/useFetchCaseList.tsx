import { useQuery, UseQueryResult } from 'react-query';
import { caseAPI } from '../../../api/API';
import { endpoints } from '../../../constants/api.constant';
import { ICase } from '../../../interfaces/case';

export const useFetchCaseList = (
): UseQueryResult<ICase[]> =>
    useQuery(endpoints.caseList, () => caseAPI.getCaseList(), {
        retry: false,
        retryOnMount: false,
        refetchOnWindowFocus: false,
        enabled: false,
        onSuccess: (res) => res,
        onError: (error: Error) => error,
    });
