import {
    AppBar, Toolbar, Button, Tooltip, Menu, MenuItem, IconButton, Avatar, Divider, ListItemIcon
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logout from '@mui/icons-material/Logout';
import {
    Link
} from 'react-router-dom';

import MaterialUISwitch from '../Tools/MaterialUISwitch';

import { useUserContext } from '../../contexts/user';

import logoSvg from '../../assets/logo-oscar-factory.svg';
import { useState } from 'react';

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        logout();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar component="header" position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', position: 'relative' }}>
                <Link to="/">
                    <img
                        alt="logo oscar"
                        src={logoSvg}
                        height="80px"
                        style={{ margin: "0.2rem 0px 0.2rem 0" }}
                    />
                </Link>
                <a style={{ display: 'none' }} href="https://www.flaticon.com/free-icons/oscar" title="oscar icons">Oscar icons created by Freepik - Flaticon</a>
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <Tooltip title={isDarkMode ? 'Passer en thème clair' : 'Passer en thème sombre' } placement="top">
                        <Button
                            color="inherit"
                            onClick={onThemeButtonClick}
                        >
                            Thème
                            <MaterialUISwitch checked={isDarkMode} handleChange={onThemeButtonClick}/>
                        </Button>
                    </Tooltip>
                </div>
                {/* si je suis connecté, ben je peux me déconnecter */}
                <div>
                    <Button color="inherit" component={Link} to="/most-liked-movies">Les plus populaires</Button>
                    <Button color="inherit" component={Link} to="/categories">
                        Catégories
                    </Button>
                    {
                        user.logged
                            ?
                            <>
                                <Tooltip title="Profil">
                                    <IconButton
                                        id="positioned-button"
                                        aria-controls={open ? 'positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(event) => setAnchorEl(event.currentTarget)}
                                    >   
                                        <Avatar sx={{ width: 40, height: 40 }}>
                                            <AccountCircleOutlinedIcon sx={{ width: 38 , height: 38 }}/>
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id="positioned-menu"
                                    aria-labelledby="positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >   
                                    <MenuItem>
                                        <Avatar sx={{ mr: 2 }}>{user.username?.charAt(0)}</Avatar>
                                        {user.username}
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem
                                        onClick={handleClick}
                                        component={Link}
                                        to="/"
                                    >
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Se déconnecter
                                    </MenuItem>
                                </Menu>
                            </>
                            : 
                            <Button color="inherit" component={Link} to="/signin">Se connecter</Button>
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
