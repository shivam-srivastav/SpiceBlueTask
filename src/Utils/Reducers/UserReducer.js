import * as TT from "../ActionTypes/ActionTypes";

const user = {
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
  company: "Hyundai india Pvt Ltd",
  currency: "USD",
};
const intialState = { ...user };

const UserReducer = (state = intialState, actions) => {
  switch (actions.type) {
    case TT.GET_USER:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
export default UserReducer;
