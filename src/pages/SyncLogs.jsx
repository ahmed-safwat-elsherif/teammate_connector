/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getLogFiles, getLogs } from '../api/logs';
import '../css/SyncLogs.css';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Loader from '../components/shared/Loader';
import LogsActionCell from '../components/logs/LogsActionCell';

function logFileClick(filename, index) {
  getLogs(index).then(axiosResp => {
    const fileContent = axiosResp.data.data.logs;
    saveFile(filename, fileContent);
  });
}

const SyncLogs = () => {
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getLogFiles()
      .then(res => {
        setFiles(res.data);
      })
      .catch(() => {
        setError("Error: couldn't get the list of logs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Box color="red" fontSize={20}>
        {error}
      </Box>
    );
  }

  return (
    <TableContainer sx={{ background: 'white', '& th': { fontWeight: 600 } }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th">*</TableCell>
            <TableCell component="th">File</TableCell>
            <TableCell component="th">Action(s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!files.length && (
            <TableRow>
              <TableCell colSpan={2}>
                <Box textAlign="center">Empty</Box>
              </TableCell>
            </TableRow>
          )}
          {files.map((file, index) => (
            <TableRow key={file}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{file}</TableCell>
              <TableCell>
                <LogsActionCell file={file} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SyncLogs;
