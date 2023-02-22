import React from "react";
import "../css/Tag.css";

export default function Tag({
  name,
  containerClassName = "tag-add-container",
  nameClassName = "tag-add-name",
}) {
  return (
    <div className={containerClassName}>
      <h5 className={nameClassName}>{name}</h5>
    </div>
  );
}
