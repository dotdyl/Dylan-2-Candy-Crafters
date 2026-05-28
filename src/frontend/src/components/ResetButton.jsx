const ResetButton = ({backendURL}) => {
    const onReset = async () => {
        console.log("reset")
        const response = await fetch(backendURL+"/load")
    };
    return(
        <button className="btn btn-primary" onClick={onReset}>
            Reset
        </button>
    );
};

export default ResetButton;