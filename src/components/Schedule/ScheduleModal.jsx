import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from '../hook-form/FormProvider';
import RHFAutocomplete from '../hook-form/RHFAutocomplete';
import Iconify from '../Iconify';
// redux
import { selectSubjects } from '~/redux/infor';
import { useSelector } from 'react-redux';

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

export default function ScheduleModal({ schedule, isOpen, handleClose }) {
  const subjects = useSelector(selectSubjects);
  console.log(subjects);
  const TableSchema = Yup.object().shape({});

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(TableSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {};

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">{schedule ? 'Chỉnh sửa bàn' : 'Thêm thời khóa biểu - Thứ 2'}</Typography>
          <IconButton onClick={handleClose}>
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
                name="teacher"
                label="Giáo viên"
                options={subjects || []}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocomplete
                name="lessonStart"
                label="Tiết bắt đầu"
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
            </Grid>
            <Grid item xs={12}>
              <RHFAutocomplete
                name="lessonEnd"
                label="Tiết kết thúc"
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                {schedule ? 'Cập nhật' : 'Tạo mới'}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Modal>
  );
}
