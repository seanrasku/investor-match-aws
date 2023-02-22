import React, { useState, useEffect } from "react";

import "../css/Dropdown.css";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown = ({ placeHolder, label, options, setType }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handler = () => setShow(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (e) => {
    e.stopPropagation();
    setShow(!show);
  };
  const getDisplay = () => {
    if (selected) {
      return selected.label;
    }
    return placeHolder;
  };
  const onItemClick = (option) => {
    setSelected(option);
    setType(option.value);
  };
  const isSelected = (option) => {
    if (!selected) {
      return false;
    }
    return selected.value === option.value;
  };

  return (
    <div>
      <label className="dropdown-placeholder">{label}</label>
      <div className="dropdown-container">
        <div onClick={handleInputClick} className="dropdown-input">
          {getDisplay()}
          {show && (
            <div className="dropdown-menu">
              {options.map((opt) => (
                <div
                  onClick={() => onItemClick(opt)}
                  key={opt.value}
                  className={`dropdown-item ${isSelected(opt) && "selected"}`}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
