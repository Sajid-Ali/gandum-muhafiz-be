//importing modules
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroSequelize = require("@admin-bro/sequelize");

const db = require("./models");
const userRoutes = require("./routes/userRoutes");
const retailerRoutes = require("./routes/retailerRoutes");

//setting up your port
const PORT = process.env.PORT || 8080;

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use("/api/retailer", retailerRoutes);
app.use("/api/users", userRoutes);

app.get("/", (request, response) => {
  response.json({ info: "Gandum Muhafiz API" });
});

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  databases: [db],
  rootPath: "/admin",
  branding: {
    companyName: "Gandum Muhafiz",
  },
  logo: false,
});

const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: `Route: ${req.originalUrl} does not exist!!!`,
  });
});

//listening to server connection
app.listen(PORT, () =>
  console.log(`Gandum Muhafiz app is running on port:: ${PORT}`)
);
