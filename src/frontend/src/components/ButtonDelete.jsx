const DeleteButton = ({ onDelete }) => {

    return (
        <button className="btn btn-error border-[#d3493f] bg-[#d3493f] btn-sm" onClick={onDelete}>
            Delete
        </button>

    );
};

export default DeleteButton;
