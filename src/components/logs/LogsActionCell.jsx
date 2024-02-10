import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import downloadRawData from '../../utils/downloadRawData';
import { getLogsByName } from '../../api/logs';
import { alertError } from '../../redux/status/actions';

const LogsActionCell = props => {
  const { file } = props;
  const [isDownloading, setIsDownLoading] = useState(false);
  const dispatch = useDispatch();
  const handleDownload = useCallback(() => {
    setIsDownLoading(true);
    getLogsByName(file)
      .then(res => {
        downloadRawData(file, res.data);
      })
      .catch(() => {
        dispatch(alertError(`Couldn't download the file: ${file}`));
      })
      .finally(() => {
        setIsDownLoading(false);
      });
  }, [file, dispatch]);

  return (
    <IconButton onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? (
        <CircularProgress size={20} />
      ) : (
        <DownloadRoundedIcon sx={{ color: '#164863' }} />
      )}
    </IconButton>
  );
};

LogsActionCell.propTypes = {
  file: PropTypes.string.isRequired,
};

export default LogsActionCell;
