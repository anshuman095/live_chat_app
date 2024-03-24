const port = process.env.PORT || 4001;
const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoute");
const practiceRouter = require("./routes/practiceRoute");
// const morgan = require("morgan");

dbConnect();

app.use(cors());
app.use(cookieParser());

// app.use(morgan("dev")); // Not so imp
app.use(
  express.json({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/practice", practiceRouter);
// app.use(notFound);
// app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
