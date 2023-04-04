import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useFetchCaseList } from './hooks/useFetchCaseList';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import useToken from '../User/hooks/useToken';
import { ICase } from '../../interfaces/case';
import { useMutation } from 'react-query';
import { caseAPI } from '../../api/API';

export default function ListCase() {
    const navigate = useNavigate();
    const { token } = useToken();
    if (!token) {
        localStorage.clear();
        navigate('/login');
    }
    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        {
            field: 'supportAgent', headerName: 'Agent', width: 150, valueGetter: (params) => {
                if (params.value) {
                    return params.value.fullName;
                }
            }
        },
        {
            field: 'isResolved', headerName: 'Case Status', width: 150, valueGetter: (params) => {
                return params.value ? 'Resolved' : 'Pending';
            }
        },
        {
            field: 'Action', headerName: 'Action', width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Button color="primary" disabled={params.row.isResolved} onClick={() => onActionResolve(params.row._id)} >Resolve</Button>
                    </div >
                )
            }
        },
    ];
    const [rows, setRows] = useState<ICase[]>([]);
    const {
        refetch,
        isLoading,
        data,
    } = useFetchCaseList();

    const resolve = (caseId: string) => caseAPI.resolveCase(caseId);
    const { mutateAsync } = useMutation(resolve);

    const onActionResolve = useCallback(async (caseId: string) => {
        await mutateAsync(caseId);
        refetch();
    }, []);

    useEffect(() => {
        if (data) {
            setRows(data ?? []);
        }
    }, [data, setRows]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const rowId = (rows: ICase) => rows._id;
    const [columnVisibilityModel,] =
        React.useState<GridColumnVisibilityModel>({
            _id: false,
        });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                <Typography component="h1" variant="h5">
                    Case List
                </Typography>
                <br />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={rowId}
                        rows={rows}
                        columns={columns}
                        columnVisibilityModel={columnVisibilityModel}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>
            </Box>
        </div >
    );
}