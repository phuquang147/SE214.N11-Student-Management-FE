import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// material
import { Card, Grid, Typography } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFAutocomplete from '~/components/hook-form/RHFAutocomplete';
// constants
import { gradeFilter, schoolYearFilter } from '~/constants';

export default function Filters() {
  const StudentSchema = Yup.object().shape({});

  const defaultValues = {};

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
    <Card sx={{ padding: '16px', my: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Bộ lọc
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <RHFAutocomplete
              name="grade"
              label="Khối"
              options={gradeFilter}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <RHFAutocomplete
              name="schoolYear"
              label="Năm học"
              options={schoolYearFilter}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
