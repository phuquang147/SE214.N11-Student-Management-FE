import { useState } from 'react';
// material
import { Box, Card, CircularProgress, Container, IconButton, Stack, Typography } from '@mui/material';
// components
import Filters from '~/components/Filters';
import Iconify from '~/components/Iconify';
import ScheduleModal from '~/components/Schedule/ScheduleModal';
import { scheduleFilters } from '~/constants/filters';

const schedule = [
  [
    {
      type: 'start',
      subject: 'a',
      teacher: 'a',
      rowSpan: 2,
    },
    null,
    null,
    null,
    null,
    null,
  ],
  [
    {
      type: 'used',
    },
    null,
    null,
    null,
    {
      type: 'start',
      subject: 'b',
      teacher: 'b',
      rowSpan: 3,
    },
    null,
  ],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

export default function Schedule() {
  const [loading, setLoading] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleShowScheduleModal = () => {
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
  };

  const handleChangeFilter = () => {};

  return (
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
          }}
        >
          <table id="schedule">
            <tr>
              <th>Tiết / Thứ</th>
              <th>
                Thứ 2
                <IconButton color="primary" size="small" sx={{ ml: 1 }} onClick={handleShowScheduleModal}>
                  <Iconify icon="material-symbols:add" width={24} height={24} />
                </IconButton>
              </th>
              <th>
                Thứ 3
                <IconButton color="primary" size="small" sx={{ ml: 1 }}>
                  <Iconify icon="material-symbols:add" width={24} height={24} />
                </IconButton>
              </th>
              <th>
                Thứ 4
                <IconButton color="primary" size="small" sx={{ ml: 1 }}>
                  <Iconify icon="material-symbols:add" width={24} height={24} />
                </IconButton>
              </th>
              <th>
                Thứ 5
                <IconButton color="primary" size="small" sx={{ ml: 1 }}>
                  <Iconify icon="material-symbols:add" width={24} height={24} />
                </IconButton>
              </th>
              <th>
                Thứ 6
                <IconButton color="primary" size="small" sx={{ ml: 1 }}>
                  <Iconify icon="material-symbols:add" width={24} height={24} />
                </IconButton>
              </th>
              <th>
                Thứ 7
                <IconButton color="primary" size="small" sx={{ ml: 1 }}>
                  <Iconify icon="material-symbols:add" width={24} height={24} />
                </IconButton>
              </th>
            </tr>

            {schedule.map((lesson, index) => (
              <tr>
                <th>{index + 1}</th>
                {lesson.map((cell) =>
                  cell ? (
                    cell.type === 'start' ? (
                      <td rowSpan={cell.rowSpan}>
                        {`Môn: ${cell.subject}`}
                        <br />
                        {`Giáo viên: ${cell.teacher}`}
                      </td>
                    ) : null
                  ) : (
                    <td></td>
                  ),
                )}
              </tr>
            ))}
          </table>
        </Card>
      )}
      {showScheduleModal && <ScheduleModal isOpen={showScheduleModal} handleClose={handleCloseScheduleModal} />}
    </Container>
  );
}
