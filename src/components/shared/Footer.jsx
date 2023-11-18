import Stack from '@mui/material/Stack';

const Footer = () => (
  <Stack>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      sx={{
        height: '60px',
        backgroundColor: '#164863',
        color: 'white',
        px: '23px',
        '& *': {
          color: 'white',
        },
      }}
    >
      Teammate+ Connector
    </Stack>
  </Stack>
);

export default Footer;
