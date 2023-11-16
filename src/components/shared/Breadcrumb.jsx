import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const routes = [
  {
    path: '/',
    breadcrumb: 'Home',
  },
  {
    path: '/sync',
    breadcrumb: 'Syncronization',
  },
  {
    path: '/sync/settings',
    breadcrumb: 'Settings',
  },
  {
    path: '/sync/queries',
    breadcrumb: 'Queries',
  },
];

const styles = {
  link: {
    ':hover': {
      textDecoration: 'underline',
    },
    '&.active': {
      fontWeight: 600,
    },
  },
};

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <Toolbar
      component={Stack}
      direction="row"
      spacing={1}
      divider={<Box>/</Box>}
      variant="dense"
      sx={{ bgcolor: '#9BBEC8' }}
    >
      {breadcrumbs.map(({ breadcrumb, key }, index) => (
        <Box
          sx={styles.link}
          className={index === breadcrumbs.length - 1 ? 'active' : ''}
          component={Link}
          key={key}
          to={key}
        >
          {breadcrumb}
        </Box>
      ))}
    </Toolbar>
  );
};

export default Breadcrumb;
