import {
    Container, Divider, Box, Typography, Fade, Paper, Button, Tooltip,
} from '@mui/material';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';

function Footer() {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<PopperPlacementType>();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
    };

    // Tooltip click
    const [openTooltipClick, setOpenTooltipClick] = useState(false);

    const handleTooltipClose = () => {
        setOpenTooltipClick(false);
    };

    const handleTooltipOpen = () => {
        navigator.clipboard.writeText('thobena.yann@orange.fr');
        setOpenTooltipClick(true);
    };

    return (
        <Container component="footer" maxWidth="lg" sx={{ mt: 4 }}>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
                <Typography gutterBottom sx={{ textAlign: 'center' }}>
                    Oscar Factory - © 2022 - <Button onClick={handleClick('top')} sx={{textTransform: 'inherit'}}><EmailTwoToneIcon sx={{mr: 1}}/>Made by Thobena Yann</Button>
                </Typography>
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ flexDirection: 'column' }}>
                            <ClickAwayListener onClickAway={handleTooltipClose}>
                                <Tooltip title="Adresse mail copiée !" placement="top" onClose={handleTooltipClose} open={openTooltipClick}>
                                    <Button sx={{ p: 2, textTransform: 'inherit'}} onClick={handleTooltipOpen}>
                                        <AlternateEmailTwoToneIcon sx={{mr: 1}}/>
                                        thobena.yann@orange.fr
                                    </Button>
                                </Tooltip>
                            </ClickAwayListener>
                            <Divider />
                            <a
                                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                target="_blank"
                                rel='noreferrer'
                                href="https://thobena-yann-developpeur-web.netlify.app"
                            >
                                <Button sx={{ p: 2, textTransform: 'inherit' }}>
                                    <LanguageTwoToneIcon sx={{mr: 1}}/>
                                    https://thobena-yann-developpeur-web.netlify.app
                                </Button>
                            </a>
                        </Paper>
                    </Fade>
                    )}
                </Popper>
            </Box>
        </Container>
    );
}

export default Footer;