import express from "express";
import {
  getTransactionsByUserId,
  insertTransaction,
  deleteTransactions,
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
router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;
    const { _id } = req.userInfo;
    const result = await deleteTransactions(_id, ids);
    result?.deletedCount
      ? res.json({
          status: "success",
          message: result.deletedCount + "Transaction deleted successfully",
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
