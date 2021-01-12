import React from "react";
import { Link } from "react-router-dom";

const ItemButton = ({ title, path }) => {
  return (
    <div className="ui grid">
      <div className="sixteen wide column">
        <Link to={path} className="ui icon right floated grey button">
          <i className="plus icon"></i> {title}
        </Link>
      </div>
    </div>
  );
};

export default ItemButton;
