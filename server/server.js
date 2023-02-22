import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
const path = require("path");
import mongoose from "mongoose";
const fileuploader = require("express-fileupload");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));
// middlewares
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//for image upload
app.use(fileuploader());
// route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
