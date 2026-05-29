const DeleteButton = ({ onDelete, rowObject }) => {

    return (
      <button className="btn btn-error border-[#d3493f] bg-[#d3493f] btn-sm" onClick={e => {e.preventDefault(); onDelete(Object.values(rowObject)[0])}}>
            Delete
        </button>

    );
};

export default DeleteButton;
