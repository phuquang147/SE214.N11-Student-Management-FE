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
import { genders, teacherStatus } from '~/constants';
import { toast } from 'react-toastify';
import { createTeacher, updateTeacher } from '~/services/teacherRequest';
import { useSelector } from 'react-redux';
import { selectRoles, selectSubjects } from '~/redux/infor';
import { useNavigate } from 'react-router';
export default function TeacherForm({ mode, teacher }) {
  const subjects = useSelector(selectSubjects);
  const roles = useSelector(selectRoles);
  const navigate = useNavigate();

  const StudentSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ và tên'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const defaultValues = {
    name: (teacher && teacher.name) || '',
    subject: (teacher && { label: teacher.subject.name, value: teacher.subject._id }) || subjects[0],
    role: (teacher && { label: teacher.role.name, value: teacher.role._id }) || roles[0],
    email: (teacher && teacher.email) || '',
    phone: (teacher && teacher.phone) || '',
    gender: (teacher && teacher.gender) || genders[0],
    birthdate: teacher ? dayjs(teacher.birthday) : dayjs('2014-08-18T21:11:54'),
    address: (teacher && teacher.address) || '',
    status: (teacher && teacher.status) || teacherStatus[0],
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
    const { name, gender, birthdate, address, email, phone, status, subject, role } = values;
    const enteredTeacher = {
      name,
      gender,
      address,
      email,
      phone,
      status,
      birthday: new Date(birthdate).toISOString(),
      subject: subject.value,
      role: role.value,
    };
    try {
      if (mode === 'edit') {
        const res = await updateTeacher(enteredTeacher, teacher._id);
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate(-1);
        }
      } else {
        const res = await createTeacher(enteredTeacher);
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate(-1);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại');
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
            name="subject"
            label="Môn học"
            options={subjects}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="role"
            label="Vai trò"
            options={[roles[0], roles[2]]}
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
          <RHFDatePicker name="birthdate" label="Ngày sinh" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="address" label="Địa chỉ" />
        </Grid>

        {mode === 'edit' && (
          <Grid item xs={12} sm={6} md={4}>
            <RHFAutocomplete
              name="status"
              label="Tình trạng"
              options={teacherStatus}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Grid>
        )}
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {mode === 'edit' ? 'Cập nhật' : 'Tạo mới'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
