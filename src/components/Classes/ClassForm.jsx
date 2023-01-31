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
import RHFTextField from '~/components/hook-form/RHFTextField';
import { useDispatch, useSelector } from 'react-redux';
import { inforActions, selectGrades } from '~/redux/infor';
import { useEffect } from 'react';
import { getAvailableTeacher } from '~/services/teacherRequest';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createClass, updateClass } from '~/services/classRequest';
import { useNavigate } from 'react-router';

export default function ClassForm({ mode, _class }) {
  const [availableTeacher, setAvailableTeacher] = useState([]);
  const grades = useSelector(selectGrades);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ClassSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên lớp'),
  });

  const defaultValues = {
    name: (_class && _class.name) || '',
    grade: (_class && _class.grade) || grades[0],
    teacher: (_class && _class.teacher) || availableTeacher[0],
  };

  const methods = useForm({
    resolver: yupResolver(ClassSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    if (!values.grade) {
      return toast.error('Vui lòng chọn khối');
    }

    if (!values.teacher) {
      return toast.error('Vui lòng chọn giáo viên');
    }

    try {
      const { name, grade, teacher } = values;
      const gradeId = grade.value;
      const teacherId = teacher.value;

      const enteredGradeInName = name.slice(0, 2);
      const selectedGradeName = grade.label;
      if (enteredGradeInName !== selectedGradeName) {
        return toast.error('Tên lớp và khối đã chọn không trùng khớp');
      }

      const enteredClass = {
        name,
        grade: gradeId,
        teacher: teacherId,
        schoolYear: new Date().getFullYear(),
      };

      if (mode === 'edit') {
        enteredClass.id = _class._id;
        const res = await updateClass(enteredClass);
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate(-1);
        }
      } else {
        const res = await createClass(enteredClass);
        const { message, newClass } = res.data;
        if (res.status === 201) {
          toast.success(message);
          dispatch(inforActions.addClass(newClass));
          navigate(-1);
        }
      }
    } catch (err) {
      toast.error('Đã có lỗi xảy ra khi thêm lớp');
    }
  };

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await getAvailableTeacher();
        const formattedTeachers = res.data.teachers.map((teacher) => ({ label: teacher.name, value: teacher._id }));
        if (_class) {
          formattedTeachers.push({ label: _class.teacher.label, value: _class.teacher.value });
        }
        setAvailableTeacher(formattedTeachers);
      } catch (err) {
        toast.error('Đã xảy ra lỗi khi tải trang');
      }
    };

    getTeachers();
  }, [_class]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField name="name" label="Tên lớp" />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="grade"
            label="Khối"
            options={grades}
            getOptionLabel={(option) => option.label || (_class && _class.grade.name.toString()) || '10'}
            isOptionEqualToValue={(option, value) => {
              // if (!isNaN(value)) {
              //   return option.label === value.toString();
              // }
              return option.label === (value.label || value.name.toString());
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <RHFAutocomplete
            name="teacher"
            label="Giáo viên"
            options={availableTeacher}
            getOptionLabel={(option) => option.label || (_class && _class.teacher.name) || ''}
            isOptionEqualToValue={(option, value) => {
              if (typeof value === 'string') {
                return option.label === value;
              }
              return option.label === value.label || option.label === value.name;
            }}
          />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          {mode === 'edit' ? 'Cập nhật' : 'Tạo mới'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
