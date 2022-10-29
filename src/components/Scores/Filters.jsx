import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormProvider from '~/components/hook-form/FormProvider';
import RHFAutocomplete from '~/components/hook-form/RHFAutocomplete';
import { selectClasses, selectSubjects } from '~/redux/infor';

const schoolYears = ['Mọi năm học', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
const grades = ['Mọi khối', '10', '11', '12'];
const semesters = ['Mọi học kỳ', 'Học kì 1', 'Học kì 2'];

export default function Filters() {
  const StudentSchema = Yup.object().shape({});
  const subjects = useSelector(selectSubjects);
  const classes = useSelector(selectClasses);

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(StudentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Card sx={{ padding: '16px', my: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Bộ lọc
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="schoolYear"
              label="Năm học"
              options={schoolYears}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
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
              name="class"
              label="Lớp"
              options={['Mọi lớp'].concat(classes)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="semester"
              label="Học kì"
              options={semesters}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="subject"
              label="Môn học"
              options={['Mọi môn học'].concat(subjects)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
