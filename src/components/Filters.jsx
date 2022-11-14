import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// material
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Typography } from '@mui/material';
// form
import { useForm } from 'react-hook-form';
import FormProvider from '~/components/hook-form/FormProvider';
import RHFAutocomplete from '~/components/hook-form/RHFAutocomplete';
// redux
import { selectClasses, selectGroupedClasses, selectSchoolYears, selectSemesters, selectSubjects } from '~/redux/infor';

const _ = require('lodash');

export default function Filters({ filters, onChangeFilter }) {
  const FilterSchema = Yup.object().shape({});

  const schoolYears = useSelector(selectSchoolYears);
  const subjects = useSelector(selectSubjects);
  const classes = useSelector(selectClasses);
  const semesters = useSelector(selectSemesters);
  const groupedClasses = useSelector(selectGroupedClasses);

  const formatedFilters = _.mapValues(_.keyBy(filters, 'name'), (filter) => {
    if (filter.name === 'class' && filter.options.length <= 1) {
      filter.options.push(...classes);
    }

    if (filter.name === 'schoolYear' && filter.options.length <= 1) {
      filter.options.push(...schoolYears);
    }

    if (filter.name === 'subject' && filter.options.length <= 1) {
      filter.options.push(...subjects);
    }

    if (filter.name === 'semester' && filter.options.length <= 1) {
      filter.options.push(...semesters);
    }

    return filter;
  });

  const [classOptions, setClassOptions] = useState([]);

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues,
  } = methods;

  const onSubmit = async (values) => {
    onChangeFilter(values);
  };

  const handleChangeSchoolYear = (newSchoolYear) => {
    if (newSchoolYear.value === 'Tất cả') {
      setClassOptions(formatedFilters.class.options);
      if (classes.length > 0) setValue('class', formatedFilters.class.options[0]);
    } else {
      setClassOptions(groupedClasses[newSchoolYear.value]);
      if (groupedClasses[newSchoolYear.value].length > 0) setValue('class', groupedClasses[newSchoolYear.value][0]);
    }
  };

  useEffect(() => {
    if (formatedFilters.schoolYear && formatedFilters.schoolYear.options.length > 0 && !getValues().schoolYear) {
      setValue('schoolYear', formatedFilters.schoolYear.options[0]);
    }

    if (formatedFilters.semester && formatedFilters.semester.options.length > 0 && !getValues().semester) {
      setValue('semester', formatedFilters.semester.options[0]);
    }

    if (formatedFilters.subject && formatedFilters.subject.options.length > 0 && !getValues().subject) {
      setValue('subject', formatedFilters.subject.options[0]);
    }

    if (formatedFilters.class && formatedFilters.class.options.length > 0 && !getValues().class) {
      if (formatedFilters.schoolYear.options[0].value === 'Tất cả') {
        setClassOptions(formatedFilters.class.options);
        setValue('class', formatedFilters.class.options[0]);
      } else {
        setClassOptions(groupedClasses[formatedFilters.schoolYear.options[0].value]);
        setValue('class', groupedClasses[formatedFilters.schoolYear.options[0].value][0]);
      }
    }
  }, [formatedFilters, groupedClasses, setValue, getValues]);

  return (
    <Card sx={{ padding: '16px', my: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Bộ lọc
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {formatedFilters &&
            Object.keys(formatedFilters).map((key, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <RHFAutocomplete
                  name={key}
                  label={formatedFilters[key].label}
                  options={key === 'class' ? classOptions : formatedFilters[key].options}
                  handleChange={key === 'schoolYear' ? handleChangeSchoolYear : null}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                />
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ py: 2, px: 4 }}>
              Tìm kiếm
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
}
