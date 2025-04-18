import usersSchema from "../usersSchema.js";

//CRUD
export const insertUser = (userObj) => {
  return usersSchema(userObj).save();
};
