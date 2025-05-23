import transactionSchema from "./transactionSchema.js";

//CRUD
export const insertTransaction = (transactionObj) => {
  return transactionSchema(transactionObj).save();
};
