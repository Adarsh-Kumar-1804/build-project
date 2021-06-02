import express from "express";
import bodyParser from "body-parser";

import projectRoutes from "./routes/index.js";

const app = express();

app.use(bodyParser.json());

app.use("/projects", projectRoutes);

app.listen(3000,()=>{
  console.log("Server running on port 3000");
});