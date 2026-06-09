/*
https://v4.daisyui.com/components/modal/
*/

import { useRef } from "react";

const ConfirmationModal = ({onReset, modalRef}) => {

    return (
        <dialog id="confirmation_modal" className="modal" ref={modalRef}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Caution!</h3>
                <p className="py-4">You are about to reset the database back to its default values.</p>
                <p>Are you sure you want to proceed?.</p>
                <div className="modal-action">
                <button className="btn" onClick={onReset}>Confirm Reset</button>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Cancel</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmationModal;