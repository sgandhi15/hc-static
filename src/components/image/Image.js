import React, { useState } from "react";
import "./style.css";

// eslint-disable-next-line
const Image = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowDialog = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <img className="small" src={src} onClick={handleShowDialog} alt="no i" />
      {isOpen && (
        <dialog className="dialog" open onClick={handleShowDialog}>
          <img
            className="image"
            src={src}
            onClick={handleShowDialog}
            alt="no i"
          />
        </dialog>
      )}
    </div>
  );
};
