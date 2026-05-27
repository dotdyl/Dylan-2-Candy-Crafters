const ResetButton = () => {
    return(
        <button className="btn btn-primary" onClick={onReset}>
            Reset
        </button>
    );
};

const onReset = () => {
    console.log("reset")
};

export default ResetButton;