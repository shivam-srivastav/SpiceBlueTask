import React from "react";
import load from "../../Assets/loading.gif";
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        border: "1px solid #323e4d4a",
      }}
    >
      <span>
        <img src={load} alt="loading" />
      </span>
    </div>
  );
};
export default Loading;
