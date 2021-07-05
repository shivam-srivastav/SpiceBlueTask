import * as TT from "../ActionTypes/ActionTypes";
export const get_user = (data) => {
  return { type: TT.GET_USER, data };
};
