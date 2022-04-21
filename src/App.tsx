import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  CssBaseline, ThemeProvider, createTheme
} from '@mui/material';

import Footer from './components/Footer';
import Header from './components/Header';
import MovieAdd from './components/MovieAdd';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import UserSignin from './components/UserSignin';
import UserSignup from './components/UserSignup';
import UserReviews from './components/UserReviews';
import NotFound from './components/NotFound';

import { useUserContext } from './contexts/user';

import { User } from './types';

import CategoriesList from './components/Categories';
import CategoryDetail from './components/CategoryDetail';
import MostLikedMovies from './components/MostLikedMovies';

const emptyUser: User = {
  // nos 3 champs controlés pour signup / signin
  username: '',
  email: '',
  password: '',
  // est-ce que on est connectés ou pas
  logged: false,
  myFavorites: [],
};

function App() {
  // gestion de l'utilisateur
  const { user, setUser } = useUserContext();
  // theme sombre ou pas ?
  const [isDarkModeState, setIsDarkModeState] = useState(false);

  function logout() {
    setUser(emptyUser);
  }


  // création d'un theme
  const darkTheme = createTheme({
    palette: {
      mode: isDarkModeState ? 'dark' : 'light'
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* reset css */}
      <CssBaseline />
      <Header
        logout={logout}
        onThemeButtonClick={() => {
          setIsDarkModeState(!isDarkModeState);
        }}
        isDarkMode={isDarkModeState}
      />
      {/*gestion des routes de l'application*/}
      <Routes>
        <Route path="/" element={<MovieList />} />
        {/* la route pour s'inscrire */}
        <Route path="/signup" element={<UserSignup />} />
        {/* la route pour se connecter */}
        <Route path="/signin" element={
          <UserSignin />
        } />
        {/* la route pour se connecter en indiquant que l'utilisateur vient d'être créé */}
        <Route path="/signin/userCreated" element={
          <UserSignin
            // ici, je donne un boolen pour indiquer au composant d'afficher
            // "lutilisateur a bien été créé"
            showUserCreated
          />
        } />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/categories/:categoryId/:categoryName" element={<CategoryDetail />} />
        <Route path="/movies/add" element={<MovieAdd />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/most-liked-movies" element={<MostLikedMovies />} />
        <Route path="/user/:userId/reviews" element={<UserReviews />} />
        {/* Si aucune route n'est atteinte, alors je veux atteindre la route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
