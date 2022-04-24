import {
    AppBar, Toolbar, Button,
} from '@mui/material';
import {
    Link
} from 'react-router-dom';

import MaterialUISwitch from '../Tools/MaterialUISwitch';

import { useUserContext } from '../../contexts/user';

import logoSvg from '../../assets/logo-oscar-factory.svg';

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
                        height="80px"
                        style={{ margin: "0.2rem 0px 0.2rem 0" }}
                    />
                    <a style={{ display: 'none' }} href="https://www.flaticon.com/free-icons/oscar" title="oscar icons">Oscar icons created by Freepik - Flaticon</a>
                </Link>
                <Button
                    color="inherit"
                    onClick={onThemeButtonClick}
                >
                    {isDarkMode ? 'Passer en thème clair' : 'Passer en thème sombre' }
                    <MaterialUISwitch checked={isDarkMode} handleChange={onThemeButtonClick}/>
                </Button>
                {/* si je suis connecté, ben je peux me déconnecter */}
                <div>
                    <Button color="inherit" component={Link} to="/most-liked-movies">Les plus populaires</Button>
                    <Button color="inherit" component={Link} to="/categories">Catégories</Button>
                    {
                        user.logged
                            ? <Button color="inherit" onClick={logout} component={Link} to="/">{user.email} - Se déconnecter</Button>
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
