const express = require("express");
const app = express();

//middlewaers
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

//routers
app.use(require("./routers/index"));

//Execution

const puerto = 300;
app.listen(puerto);
console.log("server running in http://localhost:300");
