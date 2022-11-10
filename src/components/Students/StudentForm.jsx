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
// constants
import { genders, studentStatus } from '~/constants';
// redux
import { useSelector } from 'react-redux';
import { selectClasses } from '~/redux/infor';
import { createStudent, updateStudent } from '~/services/studentRequests';
// router
import { useParams } from 'react-router';

export default function StudentForm({ mode, student }) {
  const classes = useSelector(selectClasses);
  const classesName = classes.map((_class) => _class.name);

  const params = useParams();

  const StudentSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ và tên'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const defaultValues = {
    name: (student && student.name) || '',
    email: (student && student.email) || '',
    phone: (student && student.phone) || '',
    gender: (student && student.gender) || genders[0],
    birthday: student ? dayjs(student.birthday) : dayjs('2007-01-01T21:11:54'),
    address: (student && student.address) || '',
    status: (student && student.status) || studentStatus[0],
    class: (student && student.class) || classesName[0],
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
    const { class: className, name, gender, birthday, address, email, phone, status } = values;
    const _class = classes.find((item) => item.name === className);
    const classId = _class._id;

    const student = {
      className: classId,
      name,
      gender,
      address,
      email,
      phone,
      status,
      birthday: new Date(birthday).toISOString(),
    };

    if (mode === 'create') {
      await createStudent(student);
    } else {
      await updateStudent(student, params.id);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Họ và tên" text={mode === 'edit' ? student.name : ''} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="class"
            label="Lớp"
            options={classesName}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            text={mode === 'edit' ? student.class : classesName[0]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="phone" label="Số điện thoại" text={mode === 'edit' ? student.phone : ''} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="email" label="Email" text={mode === 'edit' ? student.email : ''} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="gender"
            label="Giới tính"
            options={genders}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            text={mode === 'edit' ? student.gender : genders[0]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFDatePicker name="birthday" label="Ngày sinh" text={mode === 'edit' && dayjs(student.birthday)} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="address" label="Địa chỉ" text={mode === 'edit' ? student.address : ''} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="status"
            label="Tình trạng"
            options={studentStatus}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            text={mode === 'edit' ? student.status : studentStatus[0]}
          />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {mode === 'create' ? 'Tạo mới' : 'Cập nhật'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
