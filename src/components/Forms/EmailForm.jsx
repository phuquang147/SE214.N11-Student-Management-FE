import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// components
import FormProvider from '~/components/hook-form/FormProvider';
import RHFTextField from '~/components/hook-form/RHFTextField';
// services
import * as authServices from '~/services/authRequest';

export default function EmailForm() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
  });

  const defaultValues = {
    email: '',
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

  const onSubmit = async () => {
    const { email } = getValues();
    try {
      const { data, status } = await authServices.resetPassword({ email });
      if (status === 200) {
        Cookies.set('accountId', data.accountId);
        toast.success('Yêu cầu đổi mật khẩu thành công! Vui lòng kiểm tra email');
        navigate('/login');
      } else toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 3 }}>
        Xác nhận
      </LoadingButton>
    </FormProvider>
  );
}
