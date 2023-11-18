import { createTheme } from '@mui/material/styles';

export default createTheme({
  typography: 'Roboto',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
