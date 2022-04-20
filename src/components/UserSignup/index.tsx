import React, { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Navigate, Link as RRDLink, useNavigate } from 'react-router-dom';

import {
    Container, Box, Avatar, Typography, TextField, Button, Grid, Link, Alert
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { User } from '../../types';
import { useUserContext } from '../../contexts/user';
import { useMutation } from '@apollo/client';
import { USER_SIGNUP } from '../../apollo/mutations/signup';
import { Signup, SignupVariables } from '../../apollo/mutations/__generated__/Signup';

function UserSignup() {
    const { user, setUser } = useUserContext();

    const [mutateSignup, { error, loading, data }] = useMutation<Signup, SignupVariables>(USER_SIGNUP, {
        onCompleted: () => {
            navigate('/signin/userCreated');
            setUser({
                // je remet mon state a plat pour la page de signin
                logged: false,
                username: '',
                email: '',
                password: '',
                myFavorites: [],
            });
        }
    })

    // useNavigate renvoie une fonction qui permet de changer de route.
    const navigate = useNavigate();

    // redirect is user loggé
    if (user.logged) return <Navigate to="/" />;

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={(event: React.SyntheticEvent) => {
                        // faire une requete
                        // et donner dedans les infos du formulaire

                        // je n'oublie pas le prevent default pour ne pas recharger la page
                        event.preventDefault();
                        mutateSignup({
                            variables: {
                                input: {
                                    username: user.username!,
                                    email: user.email!,
                                    password: user.password!
                                }
                            }
                        });
                    }}>
                    {error && <Alert severity="error">{error.message || error.graphQLErrors}</Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        autoFocus
                        value={user.username}
                        onChange={(event) => setUser({ ...user, username: event.target.value } as User)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoFocus
                        value={user.email}
                        onChange={(event) => setUser({ ...user, email: event.target.value } as User)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={user.password}
                        onChange={(event) => setUser({ ...user, password: event.target.value } as User)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign up
                    </Button>
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid item >
                            <Link href="#" variant="body2" component={RRDLink} to="/signin">
                                {"Already an account ? Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container >
    );
}

export default UserSignup;

function useContext<T>(UserContext: any): { user: any; setUser: any; } {
    throw new Error('Function not implemented.');
}


function UserContext<T>(UserContext: any): { user: any; setUser: any; } {
    throw new Error('Function not implemented.');
}
