import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static" sx={{ backgroundColor: '#164863' }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box component={Link} to="/" fontSize={30}>
          Teammate+
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
export default Navbar;
