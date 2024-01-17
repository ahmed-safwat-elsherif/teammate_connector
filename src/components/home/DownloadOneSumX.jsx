/* eslint-disable react/prop-types */
import React from 'react';
import { Box, CardActionArea, Paper, styled } from '@mui/material';
import downloadCSV from '../../utils/downloadCSV';
import { getOsxData } from '../../api/sync';

const DownloadOneSumX = props => {
  const { label, icon } = props;
  const handleDownload = () => {
    getOsxData()
      .then(res => {
        downloadCSV(res.data);
      })
      .catch(() => {});
  };
  return (
    <CardActionArea key={label} onClick={handleDownload} {...props}>
      <StyledCard>
        {icon}
        <Box>{label}</Box>
      </StyledCard>
    </CardActionArea>
  );
};

const StyledCard = styled(Paper)({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 300,
  width: 300,
  fontSize: 20,
  transition: '0.3s all ease-out',
  ':hover': {
    backgroundColor: '#e7e7e7',
  },
});

export default DownloadOneSumX;
