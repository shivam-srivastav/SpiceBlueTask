import * as TT from "../ActionTypes/ActionTypes";
import {
  DeleteTask,
  addingTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  assignedUser,
} from "../Apis/Apis";
import { store } from "../Store";
const state = store.getState();
export const submit_task = (data) => {
  return (dispatch) => {
    dispatch(loading(true));
    // if (!data.time && !data.date && !data.desc) throw "INCOMPLETE_ARGUMENT";
    let timeins;
    let d = new Date();
    console.log(data.time.split("")[data.time.length - 2]);
    if (data.time.split("")[data.time.length - 2] === "a") {
      console.log("AM", data.time.split(":")[0]);

      timeins =
        Number(data.time.split(":")[0]) * 3600 +
        Number(data.time.split(":")[1].split("a")[0]) * 60;
    } else if (
      data.time.split("")[data.time.length - 2] === "p" &&
      data.time.split(":")[0] === "12"
    ) {
      console.log("PM", data.time.split(":")[0]);
      timeins =
        Number(data.time.split(":")[0] * 3600) +
        Number(data.time.split(":")[1].split("p")[0]) * 60;
    } else {
      console.log("PM not 12", data.time.split(":")[0] + 12);
      timeins =
        Number(Number(data.time.split(":")[0]) + 12) * 3600 +
        Number(data.time.split(":")[1].split("p")[0]) * 60;
    }
    const req = {
      assigned_user: data.assigned,
      task_date: data.date,
      task_time: timeins,
      is_completed: 0,
      time_zone: d.getTimezoneOffset(),
      task_msg: data.desc,
    };
    addingTask(req)
      .then((res) => {
        if (res.status !== "success") throw res;
        dispatch(get_task_list());
        window.alert("Task Created Successfully");
      })
      .catch((err) => {
        window.alert("Error:", err);
        dispatch(loading(false));
      });
  };
};
export const get_assigned = () => {
  return (dispatch) => {
    dispatch(loading(true));
    assignedUser()
      .then((res) => {
        const result = res.results.data.filter(
          (item) => item.user_status === "accepted"
        );
        dispatch(assigned(result));
        dispatch(loading(false));
      })
      .catch((err) => window.alert("Error in Fetching Assigned Users"));
  };
};
export const get_task_list = () => {
  return (dispatch) => {
    dispatch(loading(true));
    getAllTask()
      .then((res) => {
        dispatch(task_list([...res.results]));

        dispatch(loading(false));
      })
      .catch((err) => window.alert("Error in Getting Task List"));
  };
};
export const update_task = (data) => {
  return (dispatch) => {
    dispatch(loading(false));
    let timeins;
    let d = new Date();
    console.log(data.time.split("")[data.time.length - 2]);
    if (data.time.split("")[data.time.length - 2] === "a") {
      console.log("AM", data.time.split(":")[0]);

      timeins =
        Number(data.time.split(":")[0]) * 3600 +
        Number(data.time.split(":")[1].split("a")[0]) * 60;
    } else if (
      data.time.split("")[data.time.length - 2] === "p" &&
      data.time.split(":")[0] === "12"
    ) {
      console.log("PM", data.time.split(":")[0]);
      timeins =
        Number(data.time.split(":")[0] * 3600) +
        Number(data.time.split(":")[1].split("p")[0]) * 60;
    } else {
      console.log("PM not 12", data.time.split(":")[0] + 12);
      timeins =
        Number(Number(data.time.split(":")[0]) + 12) * 3600 +
        Number(data.time.split(":")[1].split("p")[0]) * 60;
    }
    const req = {
      assigned_user: data.assigned,
      task_date: data.date,
      task_time: timeins,
      is_completed: 0,
      time_zone: d.getTimezoneOffset(),
      task_msg: data.desc,
    };
    const request = {
      req,
      task_id: data.taskid,
      lead_id: data.leadid,
    };
    updateTask(request)
      .then((res) => {
        if (res.status !== "success") throw res.message;
        dispatch(get_task_list());
        window.alert("Task Updated Successfully");
      })
      .catch((err) => {
        window.alert("Error :", err);
        dispatch(loading(false));
      });
  };
};
export const delete_task = ({ lead_id, task_id }) => {
  return (dispatch) => {
    dispatch(loading(true));
    deleteTask({ lead_id, task_id })
      .then((res) => {
        dispatch(get_task_list());
        window.alert("Task Updated Successfully");
      })
      .catch((err) => {
        window.alert("Error", err);
        dispatch(loading(false));
      });
  };
};
export const get_user = (data) => {
  return {
    type: TT.GET_USER,
    data,
  };
};
export const assigned = (data) => {
  return {
    type: TT.ASSIGNED,
    data,
  };
};
export const task_list = (data) => {
  return {
    type: TT.TASK_LIST,
    data,
  };
};
export const loading = (data) => {
  return {
    type: TT.LOADING,
    data,
  };
};
