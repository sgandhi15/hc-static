import React, { useState } from "react";
import ReactModal from "react-modal";

const Modal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <ReactModal
        isOpen={showModal}
        style={customStyles}
        onRequestClose={handleCloseModal}
      >
        <div class="modal-header">
          <h5 class="modal-title">Alert...!</h5>
        </div>
        <div class="modal-body">
          <p>
            Please complete your profile to use our service and if you have
            completed please wait for verification...!
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            onClick={handleCloseModal}
            class="btn btn-primary"
          >
            Continue
          </button>
          {/* <button
            type="button"
            class="btn btn-secondary"
            onClick={handleCloseModal}
          >
            Logout
          </button> */}
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
