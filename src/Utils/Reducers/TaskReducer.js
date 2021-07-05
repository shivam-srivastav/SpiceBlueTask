import * as TT from "../ActionTypes/ActionTypes";

const intialState = {
  times: [
    "7:00am",
    "7:30am",
    "8:00am",
    "8:30am",
    "9:00am",
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
    "2:00pm",
    "2:30pm",
    "3:00pm",
    "3:30pm",
    "4:00pm",
    "4:30pm",
    "5:00pm",
    "5:30pm",
    "6:00pm",
    "6:30pm",
    "7:00pm",
    "7:30pm",
    "8:00pm",
    "8:30pm",
    "9:00pm",
    "9:30pm",
    "10:00pm",
    "10:30pm",
    "11:00pm",
    "11:30pm",
    "00:00am",
    "00:30am",
    "1:00am",
    "1:30am",
    "2:00am",
    "2:30am",
    "3:00am",
    "3:30am",
    "4:00am",
    "4:30am",
    "5:00am",
    "5:30am",
    "6:00am",
    "6:30am",
  ],
  assigned: [
    {
      by_default: "outreach",
      country: "India",
      role: 1,
      last: "Sir",
      company_id: "company_3c68cd94ebd648c78d76872cfa9f8cfb",
      created: "2021-05-31T07:55:08.152510",
      is_first: 1,
      icon:
        "http://www.gravatar.com/avatar/f2e9acdec817e24d2980d853e89385f5?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png",
      is_creator: 1,
      is_delete: 0,
      is_archived: 0,
      phone: "1234",
      user_id: "user_6beec459915f4507a8d2520e60e03c3e",
      is_shared: 1,
      name: "Subi Sir",
      modified_by: "user_6beec459915f4507a8d2520e60e03c3e",
      modified: "2021-05-31T07:55:08.152510",
      id: "user_6beec459915f4507a8d2520e60e03c3e",
      first: "Subi",
      email: "smithcheryl@yahoo.com",
      status: 1,
      user_status: "accepted",
    },
  ],
  task_list: [],
  loading: false,
};

const TaskReducer = (state = intialState, actions) => {
  switch (actions.type) {
    case TT.GET_USER:
      return {
        ...state,
      };
    case TT.ASSIGNED:
      return {
        ...state,
        assigned: actions.data,
      };
    case TT.TASK_LIST: {
      return {
        ...state,
        task_list: actions.data,
      };
    }
    case TT.LOADING:
      return {
        ...state,
        loading: actions.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default TaskReducer;
