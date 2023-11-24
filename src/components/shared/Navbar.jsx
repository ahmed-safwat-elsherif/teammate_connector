import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';

const Navbar = () => (
  <AppBar position="static" sx={{ backgroundColor: '#164863' }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box component={Link} to="/" m={3} fontSize={25} color="white" fontWeight={500}>
          Teammate+ Connector
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <ProfileButton />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
export default Navbar;
