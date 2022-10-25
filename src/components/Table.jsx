// import * as SagaActionTypes from '~/redux/constants/constantSaga';
import DataGridView from './DataGrid';

export default function Table({ data, columns }) {
  // const dispatch = useDispatch();

  const handleDelete = (student) => {
    // dispatch({
    //   type: SagaActionTypes.DELETE_PROPERTY_SAGA,
    //   propertyId: property.id,
    // });
  };

  const modifiedRows = data.map((element) => {
    return {
      ...element,
      handleDelete: handleDelete,
    };
  });

  return <DataGridView columns={columns} rows={modifiedRows} />;
}
