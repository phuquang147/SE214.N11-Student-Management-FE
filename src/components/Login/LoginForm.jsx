import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
import Iconify from '~/components/Iconify';
// cookies
import Cookies from 'js-cookie';
// services
import * as authRequest from '~/services/authRequest';
import { HOMEROOM_TEACHER, PRINCIPAL, STAFF, SUBJECT_TEACHER } from '~/constants/roles';
import * as commonDataRequest from '~/services/commonDataRequest';
import { inforActions } from '~/redux/infor';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng điền tên đăng nhập'),
    password: Yup.string().required('Vui lòng điền mật khẩu'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = methods;

  const getCommonData = async () => {
    try {
      const { data, status } = await commonDataRequest.getCommonData();
      const { classes, subjects, semesters, grades, user } = data;
      if (status === 200) {
        dispatch(inforActions.setCommonInforSuccess({ classes, subjects, semesters, grades, user }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onSubmit = async () => {
    const { username, password } = getValues();
    try {
      const { data, status } = await authRequest.login({ username, password });
      if (status === 200) {
        const { token, accountId, role } = data;

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        Cookies.set('token', token, { expires: expiryDate });
        Cookies.set('accountId', accountId, { expires: expiryDate });

        toast.success('Đăng nhập thành công');

        await getCommonData();

        if (role === SUBJECT_TEACHER || role === HOMEROOM_TEACHER) {
          navigate('/students', { replace: true });
          return;
        }

        if (role === PRINCIPAL || role === STAFF) {
          navigate('/', { replace: true });
        }
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="username" label="Tên đăng nhập" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2, textDecoration: 'none' }}>
        <Typography
          component={Link}
          to="/forgot-password"
          color="primary"
          sx={{ textDecoration: 'none !important', fontWeight: 600, fontSize: '14px' }}
        >
          Quên mật khẩu?
        </Typography>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Đăng Nhập
      </LoadingButton>
    </FormProvider>
  );
}
