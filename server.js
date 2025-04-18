import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

//Connect DB
import { mongoDBConn } from "./config/mongoDBConfig.js";
mongoDBConn();
//Middlewares
app.use(express.json);
//API endPoints
import userRouter from "./routers/userRouter.js";

app.use("/api/v1/users", userRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Its live",
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
