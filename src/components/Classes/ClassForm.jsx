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
import { useSelector } from 'react-redux';
import { selectGrades } from '~/redux/infor';

// const grades = [
//   {
//     name: 'grade',
//     label: '10',
//     value: 'aaa',
//   },
// ];

// const teachers = ['Giáo viên 1'];

export default function ClassForm() {
  const grades = useSelector(selectGrades);

  const ClassSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên lớp'),
  });

  const defaultValues = {
    name: '',
    grade: grades[0],
    // teacher: teachers[0],
  };

  const methods = useForm({
    resolver: yupResolver(ClassSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    console.log(values);
    const { name, grade } = values;
    const gradeId = grade.value;
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
            getOptionLabel={(option) => option.label || '10'}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
        </Grid>

        {/* <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="teacher"
            label="Giáo viên"
            options={teachers}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid> */}
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Tạo mới
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
