import { faker } from '@faker-js/faker';
import { Box, Button, Card, CircularProgress, Container, IconButton, Stack, Typography } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
import LessonModal from '~/components/Schedule/LessonModal';
import { scheduleFilters, teacherScheduleFilters } from '~/constants/filters';
import { PRINCIPAL, STAFF } from '~/constants/roles';
import HelmetContainer from '~/HOC/HelmetContainer';
import { selectUser } from '~/redux/infor';
import * as scheduleRequest from '~/services/scheduleRequest';
import convertLessons from '~/utils/convert-lessons';

export default function Schedule() {
  const [loading, setLoading] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const user = useSelector(selectUser);
  const [exportInfor, setExportInfor] = useState(null);

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
      const { data, status } =
        user?.role?.name === STAFF || user?.role?.name === PRINCIPAL
          ? await scheduleRequest.getClassSchedule({
              classId: values.class.value,
              semesterId: values.semester.value,
            })
          : await scheduleRequest.getTeacherSchedule({
              teacherId: user._id,
              semesterId: values.semester.value,
              schoolYear: 2023,
            });
      if (status === 200) {
        const { schedule } = data;
        if (user?.role?.name === STAFF || user?.role?.name === PRINCIPAL)
          setExportInfor({
            schoolYear: schedule.schoolYear,
            class: schedule.class.name,
            semester: schedule.semester.name,
          });
        else
          setExportInfor({
            teacher: schedule.teacher.name,
            schoolYear: schedule.schoolYear,
            semester: schedule.semester.name,
          });
        const mappedLessons = convertLessons(schedule.lessons);
        setSchedule({ ...data.schedule, lessons: mappedLessons });
      } else {
        toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
        setSchedule(null);
        setExportInfor(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setSchedule(null);
      setExportInfor(null);
    }
    setLoading(false);
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
    const sheet = workbook.addWorksheet('Thời khóa biểu');

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
          convertedLesson[`${j}`] =
            user?.role?.name === STAFF || user?.role?.name === PRINCIPAL
              ? `${lesson.subject}\n${lesson.teacher}`
              : `${lesson.className}`;
          merge.push({ sr: i + 3, sc: j + 2, er: i + 2 + lessons[i][j].rowSpan, ec: j + 2 });
        } else {
          convertedLesson[`${j}`] = '';
        }
      }

      sheet.addRow(convertedLesson);
    }

    sheet.getRow(1).font = {
      bold: true,
    };

    sheet.getColumn('A').font = {
      bold: true,
    };

    if (exportInfor !== null) {
      if (user?.role?.name === STAFF || user?.role?.name === PRINCIPAL)
        sheet.insertRow(1, {
          period: `Lớp ${exportInfor.class} - ${exportInfor.semester} - Năm ${exportInfor.schoolYear}`,
        });
      else
        sheet.insertRow(1, {
          period: `Giáo viên: ${exportInfor.teacher} - ${exportInfor.semester} - Năm ${exportInfor.schoolYear}`,
        });
      sheet.getRow(1).font = {
        bold: true,
      };
    }

    for (let mergeItem of merge) {
      const { sr, sc, er, ec } = mergeItem;
      sheet.mergeCells(sr, sc, er, ec);
    }

    sheet.mergeCells(1, 1, 1, 7);

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

  return (
    <HelmetContainer title="Thời khóa biểu | Student Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} columnGap={2}>
          <Typography variant="h4">Thời khóa biểu</Typography>
        </Stack>

        <Filters
          filters={
            user?.role?.name === STAFF || user?.role?.name === PRINCIPAL ? scheduleFilters : teacherScheduleFilters
          }
          onChangeFilter={handleChangeFilter}
        />

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
                    {(user?.role?.name === STAFF || user?.role?.name === PRINCIPAL) && (
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                        disabled={!schedule}
                        onClick={() => handleShowLessonModal(0, false)}
                      >
                        <Iconify icon="material-symbols:add" width={24} height={24} />
                      </IconButton>
                    )}
                  </th>
                  <th>
                    Thứ 3
                    {(user?.role?.name === STAFF || user?.role?.name === PRINCIPAL) && (
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                        disabled={!schedule}
                        onClick={() => handleShowLessonModal(1, false)}
                      >
                        <Iconify icon="material-symbols:add" width={24} height={24} />
                      </IconButton>
                    )}
                  </th>
                  <th>
                    Thứ 4
                    {(user?.role?.name === STAFF || user?.role?.name === PRINCIPAL) && (
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                        disabled={!schedule}
                        onClick={() => handleShowLessonModal(2, false)}
                      >
                        <Iconify icon="material-symbols:add" width={24} height={24} />
                      </IconButton>
                    )}
                  </th>
                  <th>
                    Thứ 5
                    {(user?.role?.name === STAFF || user?.role?.name === PRINCIPAL) && (
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                        disabled={!schedule}
                        onClick={() => handleShowLessonModal(3, false)}
                      >
                        <Iconify icon="material-symbols:add" width={24} height={24} />
                      </IconButton>
                    )}
                  </th>
                  <th>
                    Thứ 6
                    {(user?.role?.name === STAFF || user?.role?.name === PRINCIPAL) && (
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                        disabled={!schedule}
                        onClick={() => handleShowLessonModal(4, false)}
                      >
                        <Iconify icon="material-symbols:add" width={24} height={24} />
                      </IconButton>
                    )}
                  </th>
                  <th>
                    Thứ 7
                    {(user?.role?.name === STAFF || user?.role?.name === PRINCIPAL) && (
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                        disabled={!schedule}
                        onClick={() => handleShowLessonModal(5, false)}
                      >
                        <Iconify icon="material-symbols:add" width={24} height={24} />
                      </IconButton>
                    )}
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
                              {user?.role?.name === STAFF || user?.role?.name === PRINCIPAL ? (
                                <>
                                  <b> {`${cell.subject}`}</b>
                                  <br />
                                  {`${cell.teacher}`}
                                </>
                              ) : (
                                <b>{cell.className}</b>
                              )}

                              {(user?.role?.name === STAFF || user?.role?.name === PRINCIPAL) && (
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
                              )}
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
