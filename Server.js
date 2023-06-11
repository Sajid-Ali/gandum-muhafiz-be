//importing modules
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroSequelize = require("@admin-bro/sequelize");

const db = require("./src/models");
const userRoutes = require("./src/routes/userRoutes");
const retailerRoutes = require("./src/routes/retailerRoutes");

//setting up your port
const PORT = process.env.PORT || 8080;

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use("/api/retailer", retailerRoutes);
app.use("/api/users", userRoutes);

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  databases: [db],
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
