import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * @param {import('@mui/material/Dialog').DialogProps & {
 *   titleIcon?: React.ReactNode;
 *   open: boolean;
 *   setOpen: (open: boolean) => void;
 *   title?: React.ReactNode;
 *   children: React.ReactNode;
 *   dialogActions?: React.ReactNode;
 *   hasCloseIcon?: boolean;
 *   disableBackdropClick?: boolean;
 * }} props
 * @returns
 */
const Popup = props => {
  const {
    open,
    setOpen,
    dialogActions,
    title,
    titleIcon,
    children,
    hasCloseIcon,
    disableBackdropClick,
    ...dialogProps
  } = props;

  const handleClose = useCallback(
    (_, reason) => {
      if (disableBackdropClick && reason === 'backdropClick') return;
      setOpen?.(false);
    },
    [setOpen, disableBackdropClick]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
      aria-hidden={!open}
      {...dialogProps}
    >
      <Stack
        component={DialogTitle}
        spacing="10px"
        id="alert-dialog-title"
        alignItems="center"
        fontWeight={800}
        fontSize="20px"
        fontFamily={theme => theme.typography.fontFamily}
        position="relative"
        paddingY="1.5rem"
        px={7}
      >
        {hasCloseIcon && (
          <IconButton
            data-testid="close-popup-button"
            onClick={handleClose}
            sx={{ position: 'absolute', right: '7px', top: '7px', color: 'black' }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        )}
        {titleIcon}
        <Box sx={{ whiteSpace: 'pre-line' }}>{title}</Box>
      </Stack>
      <DialogContent>{children}</DialogContent>
      {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
    </Dialog>
  );
};

Popup.propTypes = {
  titleIcon: PropTypes.node,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node,
  dialogActions: PropTypes.node,
  hasCloseIcon: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
};

Popup.defaultProps = {
  titleIcon: null,
  children: null,
  title: null,
  dialogActions: null,
  hasCloseIcon: true,
  disableBackdropClick: false,
  setOpen: null,
};

export default memo(Popup);
