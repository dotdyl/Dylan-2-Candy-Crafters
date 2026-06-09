const ResetButton = ({backendURL}) => {
    const onReset = async () => {
        console.log("reset")
        const response = await fetch(backendURL+"/load")
    };
    return(
        <button className="btn btn-secondary bg-red-700 border-red-700 italic font-bold" onClick={onReset}>
            Reset
        </button>
    );
};

export default ResetButton;