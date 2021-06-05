import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const TodoItem = ({ item, onSetImportant }) => {
  let { url } = useRouteMatch();

  const { id, title, isImportant } = item;

  const positiveDisplay = <>&#9733;</>;
  const negativeDisplay = <>&#9734;</>;
  const importantColor = isImportant ? positiveDisplay : negativeDisplay;

  return (
    <div
      key={id}
      style={{
        width: "100%",
        height: "55px",
        border: "1px solid black",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* <span style={{ marginRight: "10px" }}>
        <input
          type="checkbox"
          id={item.id}
          value={item.id}
          checked={item.isSelected}
          onChange={handleChangeSelected}
        />
      </span> */}

      <span
        className="is-important"
        onClick={() => onSetImportant({ id, isImportant: !isImportant })}
      >
        {importantColor}
      </span>

      <Link
        to={`${url}/${id}`}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        {/* <span
          style={{ marginRight: "10px" }}
        >{`Selected: ${item.isSelected}`}</span> */}

        {/* <span
          style={{ marginRight: "10px" }}
        >{`Remove: ${item.isRemove}`}</span> */}
        <span style={{ marginRight: "10px" }}>{title}</span>
      </Link>
    </div>
  );
};

export default TodoItem;
