import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from '../hook-form/FormProvider';
import RHFAutocomplete from '../hook-form/RHFAutocomplete';
import Iconify from '../Iconify';
// redux
import { selectSubjects } from '~/redux/infor';
import { useSelector } from 'react-redux';
import { useState } from 'react';
//
import * as teacherRequest from '~/services/teacherRequest';
import * as scheduleRequest from '~/services/scheduleRequest';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '50%',
    md: '40%',
  },
  maxHeight: '90%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: {
    xs: '12px',
    md: 4,
  },
};

export default function LessonModal({ isModify, schedule, isOpen, onUpdateLessons, onClose, dayOfWeek, cell }) {
  const subjects = useSelector(selectSubjects);
  const [teachers, setTeachers] = useState([]);
  const [periodOptions, setPeriodOptions] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    if (subjects.length > 0) {
    }
  }, [subjects]);

  useEffect(() => {
    if (isModify && cell) {
      if (cell.start > 4) {
        setValue('session', 'Chiều');
        setPeriodOptions([6, 7, 8, 9, 10]);
      }

      setValue('startPeriod', cell.start + 1);
      setValue('endPeriod', cell.start + cell.rowSpan);
      setValue('subject', { label: cell.subject, value: cell.subjectId });
      setValue('teacher', { teacherName: cell.teacher, teacherId: cell.teacherId });
      setTeachers([{ teacherName: cell.teacher, teacherId: cell.teacherId }]);
    }
  }, []);

  const TableSchema = Yup.object().shape({});

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(TableSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = methods;

  const handleChangeSession = (session) => {
    if (session === 'Sáng' && periodOptions[0] === 6) {
      setPeriodOptions([1, 2, 3, 4, 5]);
      setValue('startPeriod', 1);
      setValue('endPeriod', 1);
    } else {
      setPeriodOptions([6, 7, 8, 9, 10]);
      setValue('startPeriod', 6);
      setValue('endPeriod', 6);
    }
  };

  const getAvailableTeachers = async () => {
    setValue('teacher', null);
    const values = getValues();

    try {
      const { data, status } = await teacherRequest.getAvailableTeachers({
        subjectId: values.subject.value,
        dayOfWeek,
        startPeriod: values.startPeriod,
        endPeriod: values.endPeriod,
        schoolYear: schedule.schoolYear,
        semesterId: schedule.semester,
      });

      if (status === 200) {
        setTeachers(data.availableTeachers);
        toast.success('Cập nhật danh sách giáo viên thành công');
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (error) {
      toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    }
  };

  const createLesson = async () => {
    const values = getValues();

    try {
      const { data, status } = await scheduleRequest.addLesson({
        scheduleId: schedule._id,
        subjectId: values.subject.value,
        dayOfWeek,
        startPeriod: values.startPeriod,
        endPeriod: values.endPeriod,
        teacherId: values.teacher.teacherId,
      });

      if (status === 201) {
        onUpdateLessons(data.schedule.lessons);
        toast.success(data.message);
        onClose();
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateLesson = async () => {
    const values = getValues();

    try {
      const { data, status } = await scheduleRequest.updateLesson({
        scheduleId: schedule._id,
        subjectId: values.subject.value,
        teacherId: values.teacher.teacherId,
        dayOfWeek,
        prevStartPeriod: cell.start + 1,
        prevEndPeriod: cell.start + cell.rowSpan,
        startPeriod: values.startPeriod,
        endPeriod: values.endPeriod,
      });

      if (status === 201) {
        onUpdateLessons(data.schedule.lessons);
        toast.success(data.message);
        onClose();
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onSubmit = async () => {
    isModify ? updateLesson() : createLesson();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">
            {isModify ? `Chỉnh sửa tiết học - Thứ ${dayOfWeek + 2}` : `Thêm tiết học - Thứ ${dayOfWeek + 2}`}
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFAutocomplete
                name="subject"
                label="Môn"
                options={subjects || []}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocomplete
                name="session"
                label="Buổi"
                options={['Sáng', 'Chiều']}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                handleChange={handleChangeSession}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocomplete
                name="startPeriod"
                label="Tiết bắt đầu"
                options={periodOptions}
                getOptionLabel={(option) => option.toString()}
                isOptionEqualToValue={(option, value) => option === value}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocomplete
                name="endPeriod"
                label="Tiết kết thúc"
                options={periodOptions}
                getOptionLabel={(option) => option.toString()}
                isOptionEqualToValue={(option, value) => option === value}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: '8px' }}>
              <RHFAutocomplete
                name="teacher"
                label="Giáo viên"
                options={teachers || []}
                getOptionLabel={(option) => option.teacherName}
                isOptionEqualToValue={(option, value) => option.teacherId === value.teacherId}
              />
              <Button onClick={getAvailableTeachers}>
                <Iconify icon="bytesize:reload" width={24} height={24} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                {schedule.lessons.length > 0 ? 'Cập nhật' : 'Tạo mới'}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Modal>
  );
}
