import { divide } from "lodash";
import React from "react";

const ListPlaceholder = ({ count = 1 }) => {
  const values = [];
  for (let index = 1; index <= count; index++) {
    values.push(index);
  }
  return (
    <div className="ui section">
      <br />
      {values.map((value) => (
        <div key={value} className="ui fluid placeholder">
          <div className="image header">
            <div className="line" />
            <div className="line" />
          </div>
          <div className="paragraph">
            <div className="line" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPlaceholder;
