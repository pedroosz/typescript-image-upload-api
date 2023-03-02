import dotenv from "dotenv";
import express from "express";
import { apiRouter } from "./routes/index";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/uploads"));

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
