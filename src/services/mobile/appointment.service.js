import { pool } from "../../database/conection.js";

export class appointmentService {
  constructor() {
    this.pool = pool;
  }

  async header(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT CONCAT(DATEPART(yy, C.fecha), '-', DATEPART(mm, C.fecha), '-', DATEPART(dd, C.fecha)) AS fecha, COUNT(*) AS total_citas
      FROM cargo_citas C
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      WHERE P.id_paciente = @id AND C.estado = 1 AND C.fecha > GETDATE()
      GROUP BY CONCAT(DATEPART(yy, C.fecha), '-', DATEPART(mm, C.fecha), '-', DATEPART(dd, C.fecha));`);
    return recordset;
  }

  async detail(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT C.id_cargo, U.nombre, U.telefono, U.email, CONCAT(DATEPART(yy, C.fecha), '-', DATEPART(mm, C.fecha), '-', DATEPART(dd, C.fecha)) AS fecha, LEFT(CONVERT(VARCHAR(100), C.fecha, 108), 5) AS horario FROM cargo_citas C
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente
      INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      WHERE C.estado = 1 AND P.id_paciente = @id AND C.fecha > GETDATE()
     ORDER BY CONVERT(VARCHAR(19), C.fecha, 121) ASC;`);
    return recordset;
  }
}
