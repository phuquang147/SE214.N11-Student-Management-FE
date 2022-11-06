import { Alert, Button, Container, Dialog, DialogActions, DialogTitle, Snackbar, Typography } from '@mui/material';
import * as React from 'react';
import Filters from '~/components/Filters';
import ScoresTable from '~/components/Scores/ScoresTable';
import { scoreFilters } from '~/constants/filters';

const _ = require('lodash');

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        resolve(user);
      }),
    [],
  );
};

function checkMutation(newRow, oldRow) {
  return _.isEqual(oldRow, newRow);
}

export default function Scores() {
  const mutateRow = useFakeMutation();
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = checkMutation(newRow, oldRow);
        if (!mutation) {
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow);
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow);
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Quản lý điểm</Typography>

      {!!promiseArguments && (
        <Dialog maxWidth="xs" open={true}>
          <DialogTitle>Xác nhận thay đổi điểm</DialogTitle>
          <DialogActions>
            <Button onClick={handleNo} color="error">
              Không
            </Button>
            <Button onClick={handleYes}>Xác nhận</Button>
          </DialogActions>
        </Dialog>
      )}
      <Filters filters={scoreFilters} />
      <ScoresTable processRowUpdate={processRowUpdate} />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Container>
  );
}
