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

export const deleteTransactions = (userId, ids) => {
  // if (!ids.length) {
  //   throw new Error("Transaction ID is required to delete a transaction.");
  // }
  return transactionSchema.deleteMany({ userId, _id: { $in: ids } });
};
