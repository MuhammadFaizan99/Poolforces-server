require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5173;
const bodyParser = require("body-parser");
const path = require("path")
const cors = require("cors");
const { dbConnect } = require("./connection");
const { userRouter } = require("./router/userRoute");
const {groupRouter} = require("./router/groupRoute")
const {paymentRouter} = require("./router/paymentRoute")
const { blogRouter } = require("./router/blogRoute")
const {reviewRouter} = require("./router/reviewRoute")


// Additional middleware
app.use('/static', express.static(path.join(__dirname, '/uploads')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Database connection
dbConnect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("No DB connection");
  });

// Routes
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/payments", paymentRouter);
app.use("/blogs", blogRouter);
app.use("/review", reviewRouter);

// Server connection
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
