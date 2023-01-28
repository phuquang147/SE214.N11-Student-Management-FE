import DataGridView from './DataGrid';

export default function Table({ data, columns, sx, onDelete, ...other }) {
  const handleDelete = async (id) => {
    onDelete(id);
  };

  const modifiedRows = data.map((element) => {
    return {
      ...element,
      handleDelete: () => handleDelete(element._id),
      handleUpdate: other.onUpdate,
    };
  });

  return <DataGridView columns={columns} rows={modifiedRows} {...other} />;
}
