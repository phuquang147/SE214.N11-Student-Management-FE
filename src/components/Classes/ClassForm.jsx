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
import RHFTextField from '~/components/hook-form/RHFTextField';

const grades = ['10', '11', '12'];
const teachers = ['Giáo viên 1', 'Giáo viên 2'];

export default function ClassForm() {
  const StudentSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ và tên'),
    grade: Yup.string().required('Vui lòng nhập số điện thoại'),
    teacher: Yup.string().required('Vui lòng nhập email'),
  });

  const defaultValues = {
    name: '',
    grade: '',
    teacher: '',
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
          <RHFTextField name="name" label="Tên lớp" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="grade"
            label="Khối"
            options={grades}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="teacher"
            label="Giáo viên"
            options={teachers}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Tạo mới
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
