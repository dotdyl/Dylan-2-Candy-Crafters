import DeleteButton from './ButtonDelete';

const TableRow = ({ rowObject, backendURL, refreshPeople, onDelete }) => {

    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <td>
                <DeleteButton onDelete={onDelete} />
            </td>
        </tr>
    );
};

export default TableRow;