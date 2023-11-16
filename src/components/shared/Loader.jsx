import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => (
  <Backdrop open sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
    <CircularProgress color="primary" />
  </Backdrop>
);

export default Loader;
