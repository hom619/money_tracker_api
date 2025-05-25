import express from "express";
import {
  getTransactionsByUserId,
  insertTransaction,
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
    res.json({
      status: "error",
      message:
        error?.message ||
        "Error while adding transaction. Please try again later",
    });
  }
});

// Return all transaction of a specific user

router.get("/", async (req, res) => {
  try {
    const { _id } = req.userInfo;
    const transactions = (await getTransactionsByUserId({ _id })) || [];
    res.json({
      status: "success",
      transactions,
    });
  } catch (error) {
    res.json({
      status: "error",
      message:
        error?.message ||
        "Error while fetching transactions. Please try again later",
    });
  }
});
export default router;
