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
export const deleteTransactionById = (userId, _id) => {
  return transactionSchema.deleteOne({
    userId,
    _id: _id,
  });
};
export const deleteTransactions = (userId, ids) => {
  return transactionSchema.deleteMany({ userId, _id: { $in: ids } });
};
