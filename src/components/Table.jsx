// import * as SagaActionTypes from '~/redux/constants/constantSaga';
import { toast } from 'react-toastify';
import { deleteStudent } from '~/services/studentRequests';
import DataGridView from './DataGrid';

export default function Table({ data, columns, sx, onDelete, ...other }) {
  // const dispatch = useDispatch();

  const handleDelete = async (studentId) => {
    const res = await deleteStudent(studentId);

    if (res.status === 200) {
      toast.success(res.data.message);
      const updatedStudents = data.filter((element) => element._id !== studentId);
      onDelete(updatedStudents);
    } else {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const modifiedRows = data.map((element) => {
    return {
      ...element,
      handleDelete: () => handleDelete(element._id),
    };
  });

  return <DataGridView columns={columns} rows={modifiedRows} {...other} />;
}
