import React, { useState, useEffect } from "react";
import "./Task.scss";
import clock from "../../Assets/clock.svg";
import add from "../../Assets/address.svg";
import del from "../../Assets/delete.svg";
import check from "../../Assets/check.svg";
import bell from "../../Assets/bell.svg";
import pen from "../../Assets/pen.svg";
import * as taskAction from "../../Utils/Actions/TaskActions";
import * as userAction from "../../Utils/Actions/UserActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Loading from "../Loading/Loading";

const Task = ({
  taskAction,
  times,
  get_assigned,
  loading,
  task_list,
  icon,
}) => {
  const [desc, setdesc] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [update, setupdate] = useState(false);
  const [show, setshow] = useState(false);
  const [taskid, settaskid] = useState("");
  const [leadid, setleadid] = useState("");
  const [assigned, setassigned] = useState(get_assigned[0]?.user_id);

  useEffect(() => {
    taskAction.get_assigned();
    taskAction.get_task_list();
  }, [""]);
  const onHandleSubmit = () => {
    if (window.confirm("Do you want to Create a Task")) {
      taskAction.submit_task({ desc, date, time, assigned });
      setshow(false);
    }
  };
  const onHandleUpdate = () => {
    if (window.confirm("Do you want to Update a Task")) {
      taskAction.update_task({ desc, date, time, assigned, taskid, leadid });
      setshow(false);
    } else {
    }
  };
  const onHandleDelete = () => {
    if (window.confirm("Do you want to delete Task")) {
      const data = {
        lead_id: leadid,
        task_id: taskid,
      };
      taskAction.delete_task(data);
      setshow(false);
    } else {
    }
  };
  const onHandleEdit = (e) => {
    const desc = e.target.getAttribute("data-desc");
    const time = e.target.getAttribute("data-time");
    const date = e.target.getAttribute("data-date");
    const id = e.target.getAttribute("data-id");
    const lead_id = e.target.getAttribute("data-lead");
    const secondstohhmm = (time) => {
      console.log(time);
      let ampm;
      let hr;
      const hrs = Number(Math.floor(Number(time) / 3600));
      let mm = Number(Math.floor(Number(time) % 3600) / 60);
      if (Number(hrs) < 12) {
        hr = hrs;
        ampm = "am";
        if (mm === 0) {
          mm = "00";
        }
        return `${hr}:${mm + ampm}`;
      } else if (Number(hrs) === 12) {
        hr = hrs;
        ampm = "pm";
        if (mm === 0) {
          mm = "00";
        }
        return `${hr}:${mm + ampm}`;
      } else {
        hr = hrs - 12;
        ampm = "pm";
        if (mm === 0) {
          mm = "00";
        }
        return `${hr}:${mm + ampm}`;
      }
    };
    setdate(date);
    setdesc(desc);
    settime(secondstohhmm(time));
    settaskid(id);
    setupdate(true);
    setleadid(lead_id);
    setshow(!show);
  };

  const onHandleCancel = () => {
    setdate("");
    setdesc("");
    settime("");
    setshow(!show);
    setupdate(false);
  };
  const OnHandleAdd = () => {
    setdate("");
    setdesc("");
    settime("");
    setupdate(false);
    setshow(true);
  };
  return (
    <div className="task">
      <div className="top-head">
        <li>TASK {task_list.length} </li>
        <li
          onClick={OnHandleAdd}
          style={{ position: "realtive", cursor: "pointer" }}
        >
          +<span className="hoverbar">Add New</span>
        </li>
      </div>
      {!loading ? (
        <>
          {show ? (
            <div className="taskbody">
              <li>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Task Description</p>
                  <span style={{ position: "relative" }}>
                    <img
                      style={{
                        width: "1rem",
                        position: "absolute",
                        top: "31px",
                        left: "-23px",
                      }}
                      src={add}
                      alt="add"
                    />
                  </span>
                </div>
                <input
                  type="text"
                  Value={desc}
                  placeholder="Follow-Up"
                  onChange={(e) => setdesc(e.target.value)}
                />
              </li>
              <div>
                <li>
                  <p>Date</p>
                  <input
                    type="date"
                    onChange={(e) => setdate(e.target.value)}
                    placeholder={date}
                    value={date}
                  />
                </li>
                <li>
                  <p>Time</p>
                  <span style={{ position: "relative" }}>
                    <img
                      src={clock}
                      style={{
                        width: "1rem",
                        position: "absolute",
                        top: "10px",
                        left: "5px",
                      }}
                      alt="clock"
                    />
                  </span>
                  <select
                    name="hall"
                    id="hall"
                    onChange={(e) => settime(e.target.value)}
                    value="Time"
                  >
                    <option selected>{time || `Time`}</option>
                    {times.map((time, i) => {
                      return <option>{time}</option>;
                    })}
                    }
                  </select>
                </li>
              </div>
              <li>
                <p>Assign User</p>
                <select
                  style={{ padding: "0.5rem 0.5rem" }}
                  name="hall"
                  id="hall"
                  value=""
                  onChange={(e) => setassigned(e.target.value)}
                >
                  {get_assigned.map((assign) => {
                    return (
                      <>
                        <option value={assign.user_id}>{assign.name}</option>
                      </>
                    );
                  })}
                </select>
              </li>
              <div style={{ alignItems: "center" }}>
                <li onClick={onHandleDelete}>
                  {update && (
                    <img
                      src={del}
                      alt="del"
                      style={{ width: "1rem", cursor: "pointer" }}
                    />
                  )}
                </li>
                <li style={{ flexDirection: "row" }}>
                  <button onClick={onHandleCancel} style={{ color: "#000" }}>
                    Cancel
                  </button>
                  <button
                    onClick={update ? onHandleUpdate : onHandleSubmit}
                    style={{ background: "#53bc7f", borderColor: "#53bc7f" }}
                  >
                    {update ? "Update" : "Save"}
                  </button>
                </li>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  border: "1px solid #323e4d4a",
                  maxHeight: "21.5rem",
                  overflow: "auto",
                }}
              >
                {task_list.map((task, i) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        border: "1px solid #323e4d4a",
                        borderRadius: "4px",
                        margin: ".5rem",
                        padding: "0.2rem 0.5rem",
                        alignItems: "center",
                      }}
                      key={i}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <li>
                          <img
                            style={{ width: "3rem" }}
                            src={icon}
                            alt="face"
                          />
                        </li>
                        <li
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "0.4rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          <span
                            style={{
                              color: "#000",
                              fontWeight: "600",
                              textTransform: "uppercase",
                            }}
                          >
                            {task.task_msg}
                          </span>
                          <span style={{ color: "red" }}>{task.task_date}</span>
                        </li>
                      </div>
                      <li
                        style={{
                          display: "flex",
                          width: "8rem",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          data-id={task.id}
                          data-time={task.task_time}
                          data-desc={task.task_msg}
                          data-date={task.task_date}
                          data-lead={task.lead_id}
                          style={{
                            // marginRight: ".5rem",
                            boxShadow: "border-box",
                            padding: ".6rem",
                            border: "1px solid #323e4d4a",
                            borderRadius: "3px",
                            display: "flex",
                            alignItems: "center",
                            background: "#323e4d1c",
                            position: "relative",
                            cursor: "pointer",
                          }}
                          onClick={onHandleEdit}
                          className="edit"
                        >
                          <span className="update_hover">Update</span>
                          <img
                            style={{
                              width: "1rem",
                              height: "1rem",
                              boxShadow: "border-box",
                              cursor: "pointer",
                            }}
                            data-id={task.id}
                            data-time={task.task_time}
                            data-desc={task.task_msg}
                            data-date={task.task_date}
                            data-lead={task.lead_id}
                            onClick={onHandleEdit}
                            src={pen}
                            alt="pen"
                          />
                        </div>
                        <li
                          style={{
                            border: "1px solid #323e4d4a",
                            borderRadius: "3px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              borderLeft: "1px solid #323e4d4a",
                              background: "#323e4d1c",
                              padding: ".6rem",
                            }}
                          >
                            <img
                              style={{
                                width: "1rem",
                                height: "1rem",
                                // padding: ".2rem",
                                boxShadow: "border-box",
                              }}
                              src={bell}
                              alt="bell"
                            />
                          </div>
                          <div
                            style={{
                              borderLeft: "1px solid #323e4d4a",
                              background: "#323e4d1c",
                              padding: ".6rem",
                            }}
                          >
                            {" "}
                            <img
                              style={{
                                width: "1rem",
                                height: "1rem",
                              }}
                              src={check}
                              alt="check"
                            />
                          </div>
                        </li>
                      </li>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  times: state.task.times,
  get_assigned: state.task.assigned,
  loading: state.task.loading,
  task_list: state.task.task_list,
  icon: state.user.icon,
});
const mapDispatchToProps = (dispatch) => ({
  taskAction: bindActionCreators(taskAction, dispatch),
  userAction: bindActionCreators(userAction, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Task);
