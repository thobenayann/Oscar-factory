import { Link as RRDLink } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function NotFound() {
    return (
        <Stack spacing={2} alignItems="center">
            <ErrorOutlineIcon fontSize="large" />
            <Typography variant="h4">Cette page n'existe pas !</Typography>
            <Link href="#" variant="body2" component={RRDLink} to="/">
                Revenir à la page d'accueil
            </Link>
        </Stack>
    );
}

export default NotFound;
