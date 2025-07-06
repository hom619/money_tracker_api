import express from "express";
import {
  getTransactionsByUserId,
  insertTransaction,
  deleteTransactions,
  updateTransactions,
  deleteTransactionById,
} from "../models/transactions/transactionModel.js";
const router = express.Router();
//insert Transaction
router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userId = _id;
    const result = await insertTransaction(req.body);
    if (!result?._id) {
      return res.json({
        status: "error",
        message: "Error while adding transaction. Please try again later",
      });
    }
    res.json({
      status: "success",
      message: "Transaction added successfully",
    });
  } catch (error) {
    next(error);
    // res.json({
    //   status: "error",
    //   message:
    //     error?.message ||
    //     "Error while adding transaction. Please try again later",
    // });
  }
});

// Return all transaction of a specific user

router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const transactions = (await getTransactionsByUserId({ _id })) || [];
    res.json({
      status: "success",
      transactions,
    });
  } catch (error) {
    next(error);
  }
});

//Update Transaction
router.patch("/", async (req, res, next) => {
  try {
    const { transactionId, ...rest } = req.body;
    const result = await updateTransactions(transactionId, rest.form);
    result?._id
      ? res.json({
          status: "success",
          message: "Transaction updated successfully",
        })
      : res.json({
          status: "error",
          message: "Error while updating transaction. Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

//Delete Transaction
router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;
    const { _id } = req.userInfo;
    const result = await deleteTransactions(_id, ids);
    result?.deletedCount
      ? res.json({
          status: "success",
          message: result.deletedCount + " Transaction(s) deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Error while deleting transaction. Please try again later",
        });
  } catch (error) {
    next(error);
  }
});
router.delete("/id", async (req, res, next) => {
  try {
    const { transactionId } = req.body;
    const { _id } = req.userInfo;
    const result = await deleteTransactionById(_id, transactionId);
    result?.deletedCount
      ? res.json({
          status: "success",
          message: "Transaction deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Error while deleting transaction. Please try again later",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
