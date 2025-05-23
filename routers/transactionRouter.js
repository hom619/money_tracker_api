import express from "express";
import { insertTransaction } from "../models/transactions/transactionModel.js";
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
    console.log(error.message);
  }
});

export default router;
