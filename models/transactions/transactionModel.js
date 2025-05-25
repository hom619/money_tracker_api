import transactionSchema from "./transactionSchema.js";

//CRUD
export const insertTransaction = (transactionObj) => {
  return transactionSchema(transactionObj).save();
};

export const getTransactionsByUserId = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch transactions.");
  }
  return transactionSchema.find({ userId });
};
