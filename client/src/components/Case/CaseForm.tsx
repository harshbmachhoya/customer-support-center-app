import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { caseAPI } from '../../api/API';
import { ICase } from '../../interfaces/case';
import { useMutation } from 'react-query';

const theme = createTheme();

export default function CaseForm() {
    const login = (formData: ICase) => caseAPI.createCase(formData);
    const { mutateAsync } = useMutation(login);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const reqBody = {
                title: title,
                description: description,
            };
            await mutateAsync(reqBody as unknown as ICase)
                .then((data) => {
                    alert('Your case has been registered successfully!');
                    setTitle('');
                    setDescription('');
                })
                .catch(err => {
                    alert(err.response.data.message)
                });
            return;
        } catch (error) {
            alert('Something went wrong!');
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
                        Register Your Query/Case
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Subject"
                                    autoFocus
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    name="description"
                                    id="description"
                                    label="Query"
                                    fullWidth
                                    multiline
                                    required
                                    rows={3}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}