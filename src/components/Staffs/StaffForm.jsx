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
import { genders, staffStatus } from '~/constants';
// toastify
import { toast } from 'react-toastify';
import { createStaff, updateStaff } from '~/services/staffRequest';
import { useNavigate } from 'react-router';

export default function StaffForm({ mode, staff }) {
  const navigate = useNavigate();

  const StaffSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ và tên'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const defaultValues = {
    name: (staff && staff.name) || '',
    email: (staff && staff.email) || '',
    phone: (staff && staff.phone) || '',
    gender: (staff && staff.gender) || genders[0],
    birthday: staff ? dayjs(staff.birthday) : dayjs('1999-01-01T21:11:54'),
    address: (staff && staff.address) || '',
    status: (staff && staff.status) || staffStatus[0],
  };

  const methods = useForm({
    resolver: yupResolver(StaffSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { name, gender, birthday, address, email, phone, status } = values;

    const enteredStaff = {
      name,
      gender,
      address,
      email,
      phone,
      status,
      birthday: new Date(birthday).toISOString(),
    };

    if (mode === 'edit') {
      try {
        const res = await updateStaff(enteredStaff, staff._id);
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate(-1);
        }
      } catch (err) {
        toast.error(err.response.data.message || 'Đã xảy ra lỗi khi cập nhật nhân viên');
      }
    } else {
      try {
        const res = await createStaff(enteredStaff);
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate(-1);
        }
      } catch (err) {
        toast.error(err.response.data.message || 'Đã xảy ra lỗi khi thêm nhân viên');
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
              options={staffStatus}
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
