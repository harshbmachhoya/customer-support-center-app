import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { userAPI } from '../../api/userAPI';
import { IUser } from '../../interfaces/user';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const theme = createTheme();

export default function CreateAgent() {
    const navigate = useNavigate();
    const [role, setRole] = useState('agent');
    const { state } = useLocation();
    let isAdd = true;
    let formData = { fullName: '', email: '', password: '', role: '' };
    if (state) {
        isAdd = false;
        formData = state;
        console.log(state.role)
        formData.role = state.role.name;
        console.log(formData)
    }

    const { data, refetch } = useQuery('getRoles', () => userAPI.getRoles());

    const handleChange = (event: any) => {
        setRole(event.target.value);
    };

    const createAgent = (formData: IUser) => userAPI.post(formData);

    const { mutateAsync } = useMutation(createAgent, {
        onSuccess: () => {
            alert("Agent added successfully!");
            navigate('/agent/list')
        },
        // onError: (err) => {
        //     alert("Something went wrong!" + err);
        // }
    });
    const getRoleObject = (name: string) => data?.find((obj) => obj.name === name);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<IUser | unknown> => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const role = formData.get('role') as unknown as string;
            const reqBody = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                password: formData.get('password'),
                role: getRoleObject(role),
            };
            console.log(reqBody)
            await mutateAsync(reqBody as unknown as IUser);
            return;
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {isAdd ? 'Add Agent' : 'Edit Agent'}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    value={formData.fullName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    disabled={!isAdd}
                                />
                            </Grid>
                            {data &&
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                                        <Select
                                            labelId="role"
                                            name="role"
                                            id="role"
                                            value={isAdd ? role : formData.role}
                                            label="Role"
                                            onChange={isAdd ? handleChange : undefined}
                                            disabled={!isAdd}
                                        >
                                            {data.map((data, i) => (
                                                <MenuItem
                                                    key={data._id}
                                                    value={data.name}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => handleSubmit}
                        >
                            Save
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigate('/agent/list')}
                        >
                            Back To Agent List
                        </Button>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}