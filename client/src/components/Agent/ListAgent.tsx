import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRowParams, GridRowsProp } from '@mui/x-data-grid';

export default function ListAgent() {
    const columns: GridColDef[] = [
        { field: 'fullName', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'Is Available', headerName: 'case', width: 150 },
        { field: 'Action', headerName: 'Action', width: 150 },
        { field: '_id', headerName: '_id', width: 0 },
    ];

    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/user/list")
            .then((data) => data.json())
            .then((data) => setRows(data.users))
    }, [])
    console.log(rows);

    const rowId = (rows: any) => rows._id;
    const [columnVisibilityModel, setColumnVisibilityModel] =
        React.useState<GridColumnVisibilityModel>({
            _id: false,
        });

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={rowId}
                rows={rows}
                columns={columns}
                columnVisibilityModel={columnVisibilityModel}
                checkboxSelection
            />
        </div>
    );
}