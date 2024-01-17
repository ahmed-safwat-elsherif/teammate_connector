import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import PunchClockTwoToneIcon from '@mui/icons-material/PunchClockTwoTone';
import IntegrationInstructionsTwoToneIcon from '@mui/icons-material/IntegrationInstructionsTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import { Link } from 'react-router-dom';
import RunSyncButton from '../components/sync/RunSyncButton';
import DownloadOneSumX from '../components/home/DownloadOneSumX';

const navigationCards = [
  {
    label: 'Syncronization Settings',
    to: '/sync/settings',
    icon: <PunchClockTwoToneIcon sx={{ fontSize: 50 }} />,
  },
  {
    label: 'Export One-Sum X data',
    to: '/queries',
    icon: <IntegrationInstructionsTwoToneIcon sx={{ fontSize: 50 }} />,
    Component: DownloadOneSumX,
  },
  {
    label: 'Syncronization Logs',
    to: '/sync',
    icon: <ReceiptLongTwoToneIcon sx={{ fontSize: 50 }} />,
  },
];

const Home = () => (
  <Stack alignItems="center" spacing={4}>
    <Stack direction="row" justifyContent="center" spacing={3}>
      {navigationCards.map(({ Component, ...card }) =>
        Component ? (
          <Component key={card.label} {...card} />
        ) : (
          <CardActionArea key={card.label} component={Link} {...card}>
            <StyledCard>
              {card.icon}
              <Box>{card.label}</Box>
            </StyledCard>
          </CardActionArea>
        )
      )}
    </Stack>
    <Box>
      <RunSyncButton />
    </Box>
  </Stack>
);

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

export default Home;
