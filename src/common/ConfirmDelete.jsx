import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ConfirmDelete({ onDelete, userId }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faTrashCan}
        className="ml-2 text-slate-400 cursor-pointer"
        size="lg"
        onMouseEnter={() => setShowConfirm(true)}
        onMouseLeave={() => setShowConfirm(false)}
        onClick={() => setShowConfirm(true)}
      />
      {showConfirm && (
        <div
          className="absolute z-10 mt-2 p-2 bg-red-600 text-white rounded-md shadow-lg"
          onMouseEnter={() => setShowConfirm(true)}
          onMouseLeave={() => setShowConfirm(false)}
        >
          <p>Are you sure?</p>
          <button
            className="bg-white text-red-600 px-2 py-1 rounded-md mt-1"
            onClick={() => onDelete(userId)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ConfirmDelete;
