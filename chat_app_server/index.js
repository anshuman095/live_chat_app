const port = process.env.PORT || 4001;
const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");
const morgan = require("morgan");
const { app, server } = require("./socket/socket");

dbConnect();

app.use(cors());
app.use(cookieParser());

app.use(morgan("dev"));
app.use(
  express.json({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
// app.use("/api/chat", chatRouter);
// app.use(notFound);
// app.use(errorHandler);
server.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
