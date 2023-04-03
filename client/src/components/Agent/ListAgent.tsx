import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import { IUser } from '../../interfaces/user';
import { useFetchAgentList } from './hooks/useFetchAgentList';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function ListAgent() {
    const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: 'fullName', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        {
            field: 'role', headerName: 'Role', width: 150, valueGetter: (params) => {
                if (params.value) {
                    return params.value.name;
                }
            }
        },
        {
            field: 'case', headerName: 'Case Assigned', width: 150, valueGetter: (params) => {
                return params.value ? 'Yes' : 'No';
            }
        },
        {
            field: 'Action', headerName: 'Action', width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <EditIcon titleAccess='edit' color="primary" cursor={'pointer'} onClick={() => onActionEdit(params.row)} />
                        <DeleteIcon titleAccess='edit' color="primary" cursor={'pointer'} onClick={() => onActionDelete(params.row._id)} />
                    </div>
                )
            }
        },
    ];
    const [rows, setRows] = useState<IUser[]>([]);
    const {
        refetch,
        isLoading,
        data,
    } = useFetchAgentList();

    const onActionEdit = useCallback((row: IUser) => {
        console.log(row)
        navigate(`/agent/edit/${row._id}`, { state: row });
    }, []);
    const onActionDelete = useCallback((id: string) => {
        fetch(`http://localhost:3000/user/delete?userId=${id}`, {
            method: 'DELETE',
        }).then(() => refetch())
    }, []);

    useEffect(() => {
        if (data) {
            setRows(data ?? []);
        }
    }, [data, setRows]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleCreate = useCallback(() => {
        navigate(`/agent/create`);
    }, [navigate]);

    const rowId = (rows: IUser) => rows._id;
    const [columnVisibilityModel,] =
        React.useState<GridColumnVisibilityModel>({
            _id: false,
        });

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
                    Agent List
                </Typography>
                <br />
                <Button variant="contained" size='small' onClick={() => handleCreate()}>Add New</Button>
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