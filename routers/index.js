const { Router } = require("express");
const route = Router();
route.get("/", (req, res) => {
  res.send("Bienvenido al mundo de la inffromatica");
});

const {
  getSaldoTotalPorProveedor,
  postCrearCuentasPorPagar,
} = require("../controllers/cxp.controller");

route.post("/cuentasporpagar", postCrearCuentasPorPagar);
route.get("/cuentasporpagarcretido/:cod_proveedor", getSaldoTotalPorProveedor);

module.exports = route;
