const { db } = require("../cnn");

/* Obetener Datos */
const getSaldoTotalPorProveedor = async (req, res) => {
  const cod_proveedor = req.params.cod_proveedor;
  const response = await db.any(
    `select cod_proveedor,cuentasporpagar.num_factura,  
                 MIN(cuentasporpagar.cxp_saldorestante) as saldo
                 from cuentasporpagar
                 where cod_proveedor like $1
                 group by cuentasporpagar.num_factura, cod_proveedor
                 order by num_factura asc;`,
    [cod_proveedor]
  );

  let suma = 0;
  for (let valor of response) {
    suma += parseFloat(valor["saldo"]);
  }

  res.json({
    cuentasporpagar: {
      cod_proveedor,
      suma,
    },
  });
};

const postCrearCuentasPorPagar = async (req, res) => {
  const {
    cod_proveedor,
    num_factura,
    cxp_saldototal,
    fp_id,
    cxp_descripcion,
    cxp_numerocuentabancaria,
    cxp_saldopagado,
    cxp_saldorestante,
    cxp_estado,
    cxp_fechalimite,
  } = req.query;
  const sql = `INSERT INTO public.cuentasporpagar(cod_proveedor,
                                                    num_factura, 
                                                    cxp_saldototal,
                                                    fp_id,
								                    cxp_descripcion,
                                                    cxp_numerocuentabancaria, 
                                                    cxp_fechapago,
                                                    cxp_saldopagado,
								                    cxp_saldorestante, 
                                                    cxp_estado,
                                                    cxp_fechalimite)
	                                                VALUES ($1,$2,$3, $4,
			                                        $5, $6, CURRENT_DATE, $7,
			                                        $8,$9,$10);`;
  try {
    const response = await db.query(sql, [
      cod_proveedor,
      num_factura,
      cxp_saldototal,
      fp_id,
      cxp_descripcion,
      cxp_numerocuentabancaria,
      cxp_saldopagado,
      cxp_saldorestante,
      cxp_estado,
      cxp_fechalimite,
    ]);
    res.json({
      message: "cuentas por pagar creado",
      body: {
        cuentasporpagar: {
          cod_proveedor,
          num_factura,
          cxp_saldototal,
          fp_id,
          cxp_descripcion,
          cxp_numerocuentabancaria,
          cxp_saldopagado,
          cxp_saldorestante,
          cxp_estado,
          cxp_fechalimite,
        },
      },
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getSaldoTotalPorProveedor,
  postCrearCuentasPorPagar,
};
