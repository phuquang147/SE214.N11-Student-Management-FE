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
import { conducts, genders, studentStatus } from '~/constants';
// redux
import { useSelector } from 'react-redux';
import { selectClasses } from '~/redux/infor';
import { createStudent, updateStudent } from '~/services/studentRequests';
// router
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function StudentForm({ mode, student }) {
  const classes = useSelector(selectClasses);
  const navigate = useNavigate();

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
    conduct: (student && student.conduct) || conducts[2],
    class: student ? classes.find((_class) => _class.label === student.class + ' - ' + student.schoolYear) : classes[0],
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
    const { class: className, name, gender, birthday, address, email, phone, status, conduct } = values;
    const classId = className.value;

    const student = {
      className: classId,
      name,
      gender,
      address,
      email,
      phone,
      status,
      conduct,
      birthday: new Date(birthday).toISOString(),
    };

    if (mode === 'create') {
      try {
        const res = await createStudent(student);
        if (res.status === 201) {
          navigate('/students');
          return toast.success(res.data.message);
        }
      } catch (err) {
        toast.error(err.response.data.message || 'Đã xảy ra lỗi khi tạo học sinh');
      }
    } else {
      try {
        const res = await updateStudent(student, params.id);
        if (res.status === 201) {
          navigate('/students');
          return toast.success(res.data.message);
        }
      } catch (err) {
        toast.error(err.response.data.message || 'Đã xảy ra lỗi khi cập nhật học sinh');
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Họ và tên" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="class"
            label="Lớp"
            options={classes}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
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
          <RHFDatePicker name="birthday" label="Ngày sinh" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="address" label="Địa chỉ" />
        </Grid>

        {mode === 'edit' && (
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="status"
              label="Tình trạng"
              options={studentStatus}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        )}

        {mode === 'edit' && (
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="conduct"
              label="Hạnh kiểm"
              options={conducts}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        )}
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {mode === 'create' ? 'Tạo mới' : 'Cập nhật'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
