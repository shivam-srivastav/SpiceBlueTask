import React from "react";
import Task from "../Task/Task";
import "./Index.scss";
const Index = () => {
  return (
    <div className="index">
      <div className="wrapper">
        <div className="sidebar"></div>
        <div className="main">
          <div className="border"></div>
          <div class="tasker">
            <Task />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
