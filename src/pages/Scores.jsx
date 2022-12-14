import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
// material
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
// components
import Filters from '~/components/Filters';
import ScoresTable from '~/components/Scores/ScoresTable';
// constants
import { scoreFilters } from '~/constants/filters';
// services
import * as scoresRequest from '~/services/scoresRequest';

const _ = require('lodash');

const useFakeMutation = () => {
  return useCallback(
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
  const [promiseArguments, setPromiseArguments] = useState(null);
  const [classScore, setClassScore] = useState([]);
  const [loading, setLoading] = useState(false);

  const processRowUpdate = useCallback(
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
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleChangeFilter = async (values) => {
    setLoading(true);
    const { class: _class, schoolYear, semester, subject } = values;

    try {
      const { data, status } = await scoresRequest.getScores({
        classId: _class.value,
        subject: subject.value,
        semester: semester.value,
        schoolYear: schoolYear.value,
      });
      if (status === 200) {
        const { classScore } = data;
        setClassScore(classScore);
      }
    } catch (err) {
      toast.error('???? x???y ra l???i! Vui l??ng th??? l???i');
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4">Qu???n l?? ??i???m</Typography>

      {!!promiseArguments && (
        <Dialog maxWidth="xs" open={true}>
          <DialogTitle>X??c nh???n thay ?????i ??i???m</DialogTitle>
          <DialogActions>
            <Button onClick={handleNo} color="error">
              Kh??ng
            </Button>
            <Button onClick={handleYes}>X??c nh???n</Button>
          </DialogActions>
        </Dialog>
      )}

      <Filters filters={scoreFilters} onChangeFilter={handleChangeFilter} />

      {loading ? (
        <Box sx={{ textAlign: 'center', pt: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <ScoresTable
          studentScores={classScore.length > 0 ? classScore[0].studentScores : []}
          processRowUpdate={processRowUpdate}
        />
      )}
    </Container>
  );
}
