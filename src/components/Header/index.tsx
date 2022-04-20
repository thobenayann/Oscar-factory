import { useContext } from 'react';

import {
    AppBar, Toolbar, Button,
} from '@mui/material';
import {
    Link
} from 'react-router-dom';

import { useUserContext } from '../../contexts/user';

import logoSvg from '../../assets/logo.svg';

type HeaderProps = {
    // une fonction qui ne prend pas de parametre, et qui ne renvoie rien
    // ici c'est une fonction qui est déclenchée quand je clic sur le bouton "logout"
    logout: () => void,
    // une fonction qui ne prend pas de param et qui ne renvoie rien
    // appelée lorsque que clic sur le bouton de theme.
    onThemeButtonClick: () => void,
    isDarkMode: boolean
}

function Header({ logout, onThemeButtonClick, isDarkMode }: HeaderProps) {

    const {user} = useUserContext();

    return (
        <AppBar component="header" position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>
                <Link to="/">
                    <img
                        alt="logo oscar"
                        src={logoSvg}
                        height="50px"
                        style={{ margin: "1rem 0px 0.8rem 0" }}
                    />
                </Link>
                <Button
                    color="inherit"
                    onClick={onThemeButtonClick}
                >
                    {isDarkMode ? 'Passer en thème clair' : 'Passer en thème sombre' }
                </Button>
                {/* si je suis connecté, ben je peux me déconnecter */}
                <div>
                    <Button color="inherit" component={Link} to="/categories">Catégories</Button>
                    {
                        user.logged
                            ? <Button color="inherit" onClick={logout}>{user.email} - Se déconnecter</Button>
                            : <Button color="inherit" component={Link} to="/signin">Se connecter</Button>
                    }
                    {/* si je ne suis pas connecté, je peux aussi m'inscrire. */}
                    {
                        !user.logged && <Button color="inherit" component={Link} to="/signup">S'inscrire</Button>
                    }
                </div>
            </Toolbar>
        </AppBar >
    );
}

export default Header;
