import React from "react";

const ListPlaceholder = ({ count = 1 }) => {
  const list = [];
  for (let index = 1; index <= count; index++) {
    list.push(index);
  }
  return (
    <div className="ui section">
      <br />
      <br />
      {list.map((value) => (
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
      <br />
    </div>
  );
};

export default ListPlaceholder;
