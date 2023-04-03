import React, { useCallback, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { userAPI } from '../../api/userAPI';
import { IUser } from '../../interfaces/user';
import { MenuItem, MenuList, Select } from '@mui/material';

const theme = createTheme();

export default function CreateAgent() {
    const navigate = useNavigate();
    const { data, refetch } = useQuery('getRoles', () => userAPI.getRoles());
    console.log(data);

    const createAgent = (formData: IUser) => userAPI.post(formData);

    const { mutateAsync } = useMutation(createAgent, {
        onSuccess: () => {
            alert("Agent added successfully!")
        },
        onError: () => {
            alert("Something went wrong!");
        }
    });

    // TODO: ADD CUSTOM HOOKS
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<IUser | unknown> => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const reqBody = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            console.log(reqBody)
            const data = await mutateAsync(reqBody as IUser)
            return data as unknown as IUser;

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
                        Add New Agent
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {/* <form onSubmit={() => handleSubmit}> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
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
                                />
                            </Grid>
                            {data &&
                                <Grid item xs={12}>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={data}
                                        label="Role"
                                    // input={<OutlinedInput label="Name" />}
                                    // MenuProps={MenuProps}
                                    >
                                        {data?.map((data, i) => (
                                            <MenuItem
                                                key={i}
                                                value={data.name}
                                            // style={getStyles(name, personName, theme)}
                                            >
                                                {data.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                        {/* </form> */}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigate('/agent/list')}
                        >
                            Back To Agent List
                        </Button>
                        {/* </form> */}
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}