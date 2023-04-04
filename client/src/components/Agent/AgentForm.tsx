import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { userAPI } from '../../api/API';
import { IUser } from '../../interfaces/user';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useToken from '../User/hooks/useToken';

const theme = createTheme();

export default function CreateAgent() {
    const navigate = useNavigate();
    const { token } = useToken();
    if (!token) {
        navigate('/login');
    }
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('agent');
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { state } = useLocation();
    let isAdd = true;
    if (state) {
        isAdd = false;
    }
    useEffect(() => {
        if (!isAdd) {
            setUserId(state._id);
            setFullName(state.fullName);
            setEmail(state.email);
            setPassword(state.password);
            setRole(state.role.name);
        }
    }, [isAdd, state])

    const { data } = useQuery('getRoles', () => userAPI.getRoles());

    const handleChange = (event: any) => {
        setRole(event.target.value);
    };

    const createAgent = (formData: IUser) => userAPI.createUser(formData);
    const editAgent = (formData: IUser) => userAPI.updateUser(userId, formData);

    const { mutateAsync } = useMutation(createAgent, {
        onSuccess: (data) => {
            console.log('RES', data)
            alert("Agent added successfully!");
            navigate('/agent/list')
        }
    });

    const { mutateAsync: editMutateAsync } = useMutation(editAgent, {
        onSuccess: (data) => {
            console.log('RES', data)
            alert("Agent Updated successfully!");
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
            const reqBody = {
                fullName: fullName,
                email: email,
                password: password,
                role: getRoleObject(role),
            };

            isAdd
                ? await mutateAsync(reqBody as unknown as IUser)
                : await editMutateAsync(reqBody as unknown as IUser);
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
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    onChange={(event) => setFullName(event.target.value)}
                                    value={fullName}
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
                                    onChange={(event) => setEmail(event.target.value)}
                                    value={email}
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
                                    onChange={(event) => setPassword(event.target.value)}
                                    value={password}
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
                                            value={role}
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