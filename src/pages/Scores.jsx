import { Box, Button, Container, Dialog, DialogActions, DialogTitle, Skeleton, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Filters from '~/components/Filters';
import ScoresTable from '~/components/Scores/ScoresTable';
import { scoreFilters } from '~/constants/filters';
import { selectUser } from '~/redux/infor';
import * as scoresRequest from '~/services/scoresRequest';
import { convertObjectKeysToArray } from '~/utils/convert-scores';

const _ = require('lodash');

function checkMutation(newRow, oldRow) {
  return _.isEqual(oldRow, newRow);
}

export default function Scores() {
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
    const { newRow } = promiseArguments;
    const convertedRow = convertObjectKeysToArray(newRow);
    const { oral, m15, m45, final } = convertedRow;

    try {
      const { data, status } = await scoresRequest.updateScore({
        classScoreId: classScore[0]._id,
        studentId: convertedRow.studentId,
        scores: { oral, m15, m45, final },
      });

      if (status === 201) {
        setClassScore([data.classScore]);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setPromiseArguments(null);
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

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Bảng điểm');
    sheet.columns = [
      { header: 'Mã học sinh', key: 'id', width: 20 },
      { header: 'Họ và tên', key: 'name', width: 40 },
      { header: 'Miệng', key: 'oral1', width: 6 },
      { header: '', key: 'oral2', width: 6 },
      { header: '', key: 'oral3', width: 6 },
      { header: '', key: 'oral4', width: 6 },
      { header: '', key: 'oral5', width: 6 },
      { header: '15 phút', key: 'm151', width: 6 },
      { header: '', key: 'm152', width: 6 },
      { header: '', key: 'm153', width: 6 },
      { header: '', key: 'm154', width: 6 },
      { header: '', key: 'm155', width: 6 },
      { header: '1 tiết', key: 'm451', width: 6 },
      { header: '', key: 'm452', width: 6 },
      { header: '', key: 'm453', width: 6 },
      { header: '', key: 'm454', width: 6 },
      { header: '', key: 'm455', width: 6 },
      { header: 'Cuối kỳ', key: 'final', width: 10 },
      { header: 'Trung bình', key: 'average', width: 12 },
    ];

    sheet.mergeCells(1, 3, 1, 7);
    sheet.mergeCells(1, 8, 1, 12);
    sheet.mergeCells(1, 13, 1, 17);

    sheet.getRow(1).font = {
      bold: true,
    };

    for (let studentScores of classScore[0].studentScores) {
      const {
        student: { _id, name },
        scores: { oral, m15, m45, average, final },
      } = studentScores;

      sheet.addRow({
        id: _id.substring(0, 6),
        name,
        oral1: oral[0],
        oral2: oral[1],
        oral3: oral[2],
        oral4: oral[3],
        oral5: oral[4],
        m151: m15[0],
        m152: m15[1],
        m153: m15[2],
        m154: m15[3],
        m155: m15[4],
        m451: m45[0],
        m452: m45[1],
        m453: m45[2],
        m454: m45[3],
        m455: m45[4],
        final,
        average,
      });
    }

    sheet.eachRow({ includeEmpty: true }, function (row) {
      row.border = {
        bottom: { style: 'thin' },
      };
      row.fontSize = 12;
      row.height = 40;
      row.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `test.xlsx`);
  };

  return (
    <Container sx={{ pb: 2 }}>
      <Typography variant="h4">Quản lý điểm</Typography>

      {!!promiseArguments && (
        <Dialog maxWidth="xs" open={true}>
          <DialogTitle>Xác nhận thay đổi điểm</DialogTitle>
          <DialogActions>
            <Button onClick={handleNo} color="error">
              Không
            </Button>
            <Button variant="contained" onClick={handleYes}>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Filters filters={scoreFilters} onChangeFilter={handleChangeFilter} />

      <ScoresTable
        studentScores={classScore.length > 0 ? classScore[0].studentScores : []}
        processRowUpdate={processRowUpdate}
      />
      {/* {loading ? (
        <Box sx={{ textAlign: 'center', pt: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <ScoresTable
          studentScores={classScore.length > 0 ? classScore[0].studentScores : []}
          processRowUpdate={processRowUpdate}
        />
      )} */}
      <Box sx={{ display: 'flex', justifyContent: 'end', p: 2 }}>
        <Button variant="contained" onClick={handleExportExcel}>
          Xuất Excel
        </Button>
      </Box>
    </Container>
  );
}
