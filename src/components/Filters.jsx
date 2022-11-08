import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormProvider from '~/components/hook-form/FormProvider';
import RHFAutocomplete from '~/components/hook-form/RHFAutocomplete';
import { selectClasses, selectSubjects } from '~/redux/infor';

export default function Filters({ filters, onChangeFilter }) {
  const StudentSchema = Yup.object().shape({});
  const subjects = useSelector(selectSubjects);
  const classes = useSelector(selectClasses);

  const subjectsName = subjects.map((subject) => subject.name);
  const classesName = classes.map((_class) => _class.name);

  const formatedFilters = filters.map((filter) => {
    if (filter.name === 'class' && filter.options.length === 1) {
      filter.options.push(...classesName);
    }

    if (filter.name === 'subject' && filter.options.length === 1) {
      filter.options.push(...subjectsName);
    }

    return filter;
  });

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
    onChangeFilter(values);
  };
  return (
    <Card sx={{ padding: '16px', my: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Bộ lọc
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {formatedFilters &&
            formatedFilters.map((filter, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RHFAutocomplete
                  name={filter.name}
                  label={filter.label}
                  options={filter.options}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                />
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Tìm kiếm
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
