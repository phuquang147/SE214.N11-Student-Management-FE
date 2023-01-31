import { faker } from '@faker-js/faker';
import { Box, Button, Card, CircularProgress, Container, IconButton, Stack, Typography } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
import LessonModal from '~/components/Schedule/LessonModal';
import { scheduleFilters } from '~/constants/filters';
import HelmetContainer from '~/HOC/HelmetContainer';
import * as scheduleRequest from '~/services/scheduleRequest';
import convertLessons from '~/utils/convert-lessons';

export default function Schedule() {
  const [loading, setLoading] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const handleShowLessonModal = (dayOfWeek, isModify, cell) => {
    setShowLessonModal({ dayOfWeek, isModify, cell });
  };

  const handleCloseLessonModal = () => {
    setShowLessonModal(null);
  };

  const updateLessons = (newLessons) => {
    setSchedule((prev) => ({ ...prev, lessons: convertLessons(newLessons) }));
  };

  const handleChangeFilter = async (values) => {
    setLoading(true);
    try {
      const { data, status } = await scheduleRequest.getClassSchedule({
        classId: values.class.value,
        semesterId: values.semester.value,
      });

      if (status === 200) {
        const mappedLessons = convertLessons(data.schedule.lessons);
        setSchedule({ ...data.schedule, lessons: mappedLessons });
      } else {
        toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
        setSchedule(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setSchedule(null);
    }
    setLoading(false);

    console.log(schedule);
  };

  const deleteLesson = async (cell, cellIndex) => {
    try {
      const { data, status } = await scheduleRequest.deleteLesson({
        scheduleId: schedule._id,
        dayOfWeek: cellIndex,
        startPeriod: cell.start + 1,
        endPeriod: cell.start + cell.rowSpan,
      });
      if (status === 201) {
        updateLessons(data.schedule.lessons);
        toast.success(data.message);
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Bảng điểm');

    sheet.columns = [
      { header: 'Tiết / Thứ', key: 'period', width: 10 },
      { header: 'Thứ 2', key: '0', width: 30 },
      { header: 'Thứ 3', key: '1', width: 30 },
      { header: 'Thứ 4', key: '2', width: 30 },
      { header: 'Thứ 5', key: '3', width: 30 },
      { header: 'Thứ 6', key: '4', width: 30 },
      { header: 'Thứ 7', key: '5', width: 30 },
    ];

    const lessons = schedule.lessons;

    let merge = [];

    for (let i = 0; i < lessons.length; i++) {
      const convertedLesson = { period: i + 1 };

      for (let j = 0; j < lessons[i].length; j++) {
        const lesson = lessons[i][j];
        if (lesson && lesson.type === 'start') {
          convertedLesson[`${j}`] = `${lesson.subject}\n${lesson.teacher}`;
          merge.push({ sr: i + 2, sc: j + 2, er: i + 1 + lessons[i][j].rowSpan, ec: j + 2 });
        } else {
          convertedLesson[`${j}`] = '';
        }
      }

      sheet.addRow(convertedLesson);
    }

    for (let mergeItem of merge) {
      const { sr, sc, er, ec } = mergeItem;
      sheet.mergeCells(sr, sc, er, ec);
    }

    sheet.getRow(1).font = {
      bold: true,
    };

    sheet.getColumn('A').font = {
      bold: true,
    };

    sheet.eachRow({ includeEmpty: true }, function (row) {
      row.fontSize = 12;
      row.height = 60;
      row.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buf]),
      `TKB - Lớp ${schedule.class.name} - ${schedule.semester.name} - Năm học ${schedule.schoolYear}.xlsx`,
    );
  };

  console.log(schedule?.lessons);

  return (
    <HelmetContainer title="Thời khóa biểu | Student Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
          <Typography variant="h4">Thời khóa biểu</Typography>
        </Stack>

        <Filters filters={scheduleFilters} onChangeFilter={handleChangeFilter} />

        {loading ? (
          <Box sx={{ textAlign: 'center', pt: 3 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Card
            sx={{
              width: '100%',
              '& .super-app-theme--header': {
                backgroundColor: '#5e94ca',
                color: 'white',
              },
              padding: 4,
              overflowX: 'auto',
            }}
          >
            <table id="schedule">
              <thead>
                <tr>
                  <th>Tiết / Thứ</th>
                  <th>
                    Thứ 2
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                      disabled={!schedule}
                      onClick={() => handleShowLessonModal(0, false)}
                    >
                      <Iconify icon="material-symbols:add" width={24} height={24} />
                    </IconButton>
                  </th>
                  <th>
                    Thứ 3
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                      disabled={!schedule}
                      onClick={() => handleShowLessonModal(1, false)}
                    >
                      <Iconify icon="material-symbols:add" width={24} height={24} />
                    </IconButton>
                  </th>
                  <th>
                    Thứ 4
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                      disabled={!schedule}
                      onClick={() => handleShowLessonModal(2, false)}
                    >
                      <Iconify icon="material-symbols:add" width={24} height={24} />
                    </IconButton>
                  </th>
                  <th>
                    Thứ 5
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                      disabled={!schedule}
                      onClick={() => handleShowLessonModal(3, false)}
                    >
                      <Iconify icon="material-symbols:add" width={24} height={24} />
                    </IconButton>
                  </th>
                  <th>
                    Thứ 6
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                      disabled={!schedule}
                      onClick={() => handleShowLessonModal(4, false)}
                    >
                      <Iconify icon="material-symbols:add" width={24} height={24} />
                    </IconButton>
                  </th>
                  <th>
                    Thứ 7
                    <IconButton
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                      disabled={!schedule}
                      onClick={() => handleShowLessonModal(5, false)}
                    >
                      <Iconify icon="material-symbols:add" width={24} height={24} />
                    </IconButton>
                  </th>
                </tr>
              </thead>

              <tbody>
                {schedule &&
                  schedule.lessons.map((lesson, index) => (
                    <tr key={faker.database.mongodbObjectId()}>
                      <th>{index + 1}</th>
                      {lesson.map((cell, cellIndex) => {
                        return cell ? (
                          cell.type === 'start' ? (
                            <td
                              key={faker.database.mongodbObjectId()}
                              rowSpan={cell.rowSpan}
                              className="used h-3 "
                              onContextMenu={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <b> {`${cell.subject}`}</b>
                              <br />
                              {`${cell.teacher}`}
                              <Box sx={{ position: 'absolute', top: 0, right: 0 }} className="lesson_actions">
                                <IconButton
                                  sx={{ fontSize: 20, color: '#55b8ff' }}
                                  onClick={() => {
                                    handleShowLessonModal(cellIndex, true, cell);
                                  }}
                                >
                                  <Iconify icon="material-symbols:edit" />
                                </IconButton>
                                <IconButton
                                  sx={{ fontSize: 20, color: '#fa5252' }}
                                  onClick={() => deleteLesson(cell, cellIndex)}
                                >
                                  <Iconify icon="zondicons:close" />
                                </IconButton>
                              </Box>
                            </td>
                          ) : null
                        ) : (
                          <td key={faker.database.mongodbObjectId()}></td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
            <Box sx={{ display: 'flex', justifyContent: 'end', p: 2 }}>
              <Button variant="contained" disabled={!schedule} onClick={handleExportExcel}>
                Xuất Excel
              </Button>
            </Box>
          </Card>
        )}
        {showLessonModal && (
          <LessonModal
            isModify={showLessonModal.isModify}
            isOpen={showLessonModal !== null}
            onUpdateLessons={updateLessons}
            onClose={handleCloseLessonModal}
            schedule={schedule}
            dayOfWeek={showLessonModal.dayOfWeek}
            cell={showLessonModal.cell}
          />
        )}
      </Container>
    </HelmetContainer>
  );
}
