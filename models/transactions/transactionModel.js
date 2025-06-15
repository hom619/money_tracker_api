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
export const updateTransactions = (_id, rest) => {
  console.log("Updating transaction with id:", _id, "and data:", rest);
  return transactionSchema.findByIdAndUpdate(_id, rest, {
    new: true,
  });
};
export const deleteTransactions = (userId, ids) => {
  // if (!ids.length) {
  //   throw new Error("Transaction ID is required to delete a transaction.");
  // }
  return transactionSchema.deleteMany({ userId, _id: { $in: ids } });
};
