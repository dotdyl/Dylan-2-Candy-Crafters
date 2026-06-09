// Citation for the following module:
// Date: 06/08/2026
// Adapted/Copied from:
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-web-application-technology-2?module_item_id=26640188

import DeleteButton from './ButtonDelete';

const TableRow = ({ rowObject, backendURL, onDelete, noDeleteButton }) => {

    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            {!noDeleteButton && 
                <td>
                <DeleteButton onDelete={onDelete} rowObject={rowObject}/>
                </td>
            }
        </tr>
    );
};

export default TableRow;
