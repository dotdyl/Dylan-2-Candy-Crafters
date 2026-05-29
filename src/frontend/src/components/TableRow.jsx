// Citation for the following module:
// Date: 05/28/2026
// Adapted/Copied from:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464666?module_item_id=26640209

import DeleteButton from './ButtonDelete';

const TableRow = ({ rowObject, backendURL, refreshPeople, onDelete }) => {

    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <td>
              <DeleteButton onDelete={onDelete} rowObject={rowObject}/>
            </td>
        </tr>
    );
};

export default TableRow;
