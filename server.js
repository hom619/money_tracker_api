import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

//Connect DB
import { mongoDBConn } from "./config/mongoDBConfig.js";
mongoDBConn();
//Middlewares
app.use(express.json());
import cors from "cors";
app.use(cors());
//API endPoints
import userRouter from "./routers/userRouter.js";
import transactionRouter from "./routers/transactionRouter.js";
import { auth } from "./middlewares/authMiddleware.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", auth, transactionRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Its live",
  });
});

//404 page not found
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.statusCode = 404;
  next(error);
});

//Error handler
import { errorHandler } from "./middlewares/errorHandler.js";
app.use(errorHandler);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
