
import ConfirmationModal from "./ConfirmationModal";
import { useRef } from "react";

const ResetButton = ({backendURL}) => {

    const modalRef = useRef(null)

    const onReset = async () => {
        modalRef.current.close()
        const response = await fetch(backendURL+"/load")
        alert("Database reset to default.")
    };

    return(
        <>
            <button className="btn btn-secondary bg-red-700 border-red-700 italic font-bold" onClick={e => {modalRef.current.showModal()}}>
                Reset
            </button>
            <ConfirmationModal onReset={onReset} modalRef={modalRef}></ConfirmationModal>
        </>
    );
};

export default ResetButton;