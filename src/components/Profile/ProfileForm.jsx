import dayjs from 'dayjs';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFAutocomplete from '~/components/hook-form/RHFAutocomplete';
import RHFDatePicker from '~/components/hook-form/RHFDatePicker';
import RHFTextField from '~/components/hook-form/RHFTextField';

const genders = ['Nam', 'Nữ'];

export default function ProfileForm() {
  const StudentSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ và tên'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    gender: genders[0],
    birthdate: dayjs('2014-08-18T21:11:54'),
    address: '',
  };

  const methods = useForm({
    resolver: yupResolver(StudentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Họ và tên" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="phone" label="Số điện thoại" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="email" label="Email" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="gender"
            label="Giới tính"
            options={genders}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFDatePicker name="birthdate" label="Ngày sinh" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="address" label="Địa chỉ" />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Xác nhận
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
