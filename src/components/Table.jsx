// import * as SagaActionTypes from '~/redux/constants/constantSaga';
import { deleteStudent } from '~/services/studentRequests';
import DataGridView from './DataGrid';

export default function Table({ data, columns, sx, onDelete, ...other }) {
  // const dispatch = useDispatch();

  const handleDelete = async (studentId) => {
    const res = await deleteStudent(studentId);
    console.log(res);
    const updatedStudents = data.filter((element) => element._id !== studentId);
    onDelete(updatedStudents);
  };

  const modifiedRows = data.map((element) => {
    return {
      ...element,
      handleDelete: () => handleDelete(element._id),
    };
  });

  return <DataGridView columns={columns} rows={modifiedRows} {...other} />;
}
