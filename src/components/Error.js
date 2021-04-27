import React, { useEffect, useState } from "react";

const Error = ({ message, setEr }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (message) setOpen(true);
    else setOpen(false);
  }, [message]);

  return (
    open && (
      <div
        className="alert alert-info alert-dismissible fade show"
        role="alert"
      >
        <strong>Alert!</strong> {message}
        <button
          type="button"
          className="close"
          onClick={() => {
            setOpen(false);
            setEr();
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  );
};

export default Error;
