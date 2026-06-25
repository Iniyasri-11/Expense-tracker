require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();


connectDB();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-tracker-git-main-kec7.vercel.app"
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
