import React, { useState } from 'react';
import axios from 'axios';

import { Navigate, Link as RRDLink, useNavigate } from 'react-router-dom';

import { useUserContext } from '../../contexts/user';

import {
    Container, Box, Avatar, Typography, TextField, Button, Grid, Link, Alert
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { User } from '../../types';
import { useLazyQuery } from '@apollo/client';
import { USER_SIGNIN } from '../../apollo/queries/signin';
import { GET_MY_FAVORITES } from '../../apollo/queries/getMyFavorites';
import { GetMyFavoriteMovies } from '../../apollo/queries/__generated__/GetMyFavoriteMovies';

import { Signin, SigninVariables } from '../../apollo/queries/__generated__/Signin';

type UserSigninProps = {
    showUserCreated?: boolean
}

function UserSignin({ showUserCreated }: UserSigninProps) {
    const { user, setUser } = useUserContext();
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    const [getMyFavorite, { data }] = useLazyQuery<GetMyFavoriteMovies>(GET_MY_FAVORITES, {
        onCompleted: (favorites) => {
            console.log(favorites, 'MY FAVORITES');
            const myIdOfFavorite = favorites.getMyFavoriteMovies.map((f: any) => f.id);
            console.log(myIdOfFavorite, 'MON NOUVEL ARRAY');
            setUser({ ...user, myFavorites: myIdOfFavorite });
            // redirgie vers le signin
            navigate('/');
        }
    })


    // on utilise pas loading ni error mais on le fera bientot
    // useLazyQuery nous permet de lancer notre requete quand on veut.
    const [getUser, { loading }] = useLazyQuery<Signin, SigninVariables>(USER_SIGNIN, {
        onCompleted: (data) => {

            if (!data.signin) {
                return;
            }

            // console.log(data, 'USER INFO DANS MON ON COMPLETED')
            setUser({ ...user, ...data.signin, token: data.signin.token?.token, logged: true } as User);
            getMyFavorite();
        }
    })

    // destructuration en js 

    // const user2 = {
    //     username: 'david',
    //     mdp: 'toto',
    //     logged: false,
    // }

    // const user3 = { ...user2, logged: true, mdp: 'tata' };

    // console.log(user3, 'user3')

    return (
        <Container component="main" maxWidth="xs">
            {showUserCreated && <Alert severity="success">Your account was successfully created</Alert>}
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={(event: React.SyntheticEvent) => {
                        event.preventDefault();
                        setError(false);
                        getUser({
                            variables: {
                                email: user.email,
                                password: user.password,
                            }
                        })
                    }}>
                    {error && <Alert severity="error">Wrong credentials</Alert>}
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
                        Sign In
                    </Button>
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid item >
                            <Link href="#" variant="body2" component={RRDLink} to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container >
    );
}

export default UserSignin;