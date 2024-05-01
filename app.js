const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const webRoutes = require("./routes/web_routes");
const apiRoutes = require("./routes/api");

app.use(express.json())
app.use(express.static(__dirname + "/public"));
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//web_routes
app.use("/", webRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log("connnect");
});
