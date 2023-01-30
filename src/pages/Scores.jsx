import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// material
import { Button, Container, Dialog, DialogActions, DialogTitle, Skeleton, Typography } from '@mui/material';
// components
import Filters from '~/components/Filters';
import ScoresTable from '~/components/Scores/ScoresTable';
// constants
import { scoreFilters } from '~/constants/filters';
// services
import * as scoresRequest from '~/services/scoresRequest';
import { selectUser } from '~/redux/infor';
import { useSelector } from 'react-redux';

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
  const user = useSelector(selectUser);
  const [loaded, setLoaded] = useState(user.hasOwnProperty());

  useEffect(() => {
    const getAllScores = async () => {
      const { data } = await scoresRequest.getAllScores();
      setClassScore(data.classScore);
      setLoaded(true);
    };

    getAllScores();
  }, []);

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
      toast.error('Đã xảy ra lỗi! Vui lòng thử lại');
    }
  };

  if (!loaded) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: '16px' }} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px', mt: 2 }} />
      </>
    );
  }

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

      <Filters filters={scoreFilters} onChangeFilter={handleChangeFilter} />

      <ScoresTable
        studentScores={classScore.length > 0 ? classScore[0].studentScores : []}
        processRowUpdate={processRowUpdate}
      />
    </Container>
  );
}
