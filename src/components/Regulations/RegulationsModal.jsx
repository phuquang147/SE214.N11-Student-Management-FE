import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from '../hook-form/FormProvider';
import Iconify from '../Iconify';
import RHFTextField from '../hook-form/RHFTextField';
import { updateRegulation } from '~/services/regulationsRequest';
import { toast } from 'react-toastify';
// redux

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

export default function RegulationsModal({ regulation, isOpen, onClose, onReload }) {
  const RegulationsSchema = Yup.object().shape({});

  const defaultValues = {
    name: regulation?.name || '',
    min: regulation?.min || '',
    max: regulation?.max || '',
  };

  const methods = useForm({
    resolver: yupResolver(RegulationsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      const res = await updateRegulation(regulation._id, { ...values });
      if (res.status === 201) {
        toast.success(res.data.message);
        onClose();
        onReload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4">Thay đổi quy định</Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="ep:close" width={24} height={24} />
          </IconButton>
        </Stack>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFTextField name="name" label="Tên quy định" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="min" label="Giá trị tối thiểu" type="number" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="max" label="Giá trị tối đa" type="number" />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Cập nhật
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Modal>
  );
}
