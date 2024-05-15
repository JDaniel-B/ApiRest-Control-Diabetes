import { pool } from "../../database/conection.js";

export class chargeAppointmentService {
  constructor() {
    this.pool = pool;
  }

  async headerFuture() {
    const { recordset } = await this.pool.request()
      .query(`SELECT CONCAT(DATEPART(yy, C.fecha), '-', DATEPART(mm, C.fecha), '-', DATEPART(dd, C.fecha)) AS fecha, COUNT(*) AS total_citas
    FROM cargo_citas C
    INNER JOIN expediente E ON C.id_expediente = E.id_expediente
    WHERE C.estado = 1 AND C.fecha > GETDATE()
    GROUP BY CONCAT(DATEPART(yy, C.fecha), '-', DATEPART(mm, C.fecha), '-', DATEPART(dd, C.fecha));`);
    return recordset;
  }

  async detailFuture() {
    const { recordset } = await this.pool.request()
      .query(`SELECT C.id_cargo, P.nombre AS paciente, P.telefono, P.direccion, TD.descripcion AS diabetes, CONCAT(DATEPART(yy, C.fecha), '-', DATEPART(mm, C.fecha), '-', DATEPART(dd, C.fecha)) AS fecha, LEFT(CONVERT(VARCHAR(100), C.fecha, 108), 5) AS horario FROM cargo_citas C
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente
      INNER JOIN tipo_diabetes TD ON E.id_diabetes = TD.id_diabetes
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      WHERE C.estado = 1 AND C.fecha > GETDATE()
    ORDER BY CONVERT(VARCHAR(19), C.fecha, 121) ASC;`);
    return recordset;
  }

  async find() {
    const { recordset } = await this.pool.request()
      .query(`SELECT C.id_cargo, P.nombre, P.email, P.telefono, D.descripcion, C.fecha, U.nombre AS usuario, C.estado FROM cargo_citas C 
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente 
	    INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes;`);
    return recordset;
  }

  async findByUser(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT C.id_cargo, P.nombre, P.email, P.telefono, D.descripcion, C.fecha, U.nombre AS usuario, C.estado FROM cargo_citas C 
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente 
	    INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes
	  WHERE U.id_usuario = @id;`);
    return recordset;
  }

  async findOne(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT P.nombre, P.email, P.telefono, D.descripcion, C.fecha, C.estado FROM cargo_citas C 
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente 
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes WHERE C.id_cargo = @id`);
    return recordset;
  }

  async create(data) {
    const result = await this.pool
      .request()
      .input("idRecord", data.idRecord)
      .input("date", data.date)
      .input("status", 1)
      .query(
        `INSERT INTO cargo_citas (id_expediente, fecha, estado) VALUES (@idRecord, CAST(@date AS datetime), @status)`
      );
    return result;
  }

  async update(data, id) {
    const result = await this.pool
      .request()
      .input("date", data.date)
      .input("id", id)
      .query(
        `UPDATE cargo_citas SET fecha = COALESCE(@date, fecha) WHERE id_cargo = @id;`
      );
    return result;
  }

  async active(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE cargo_citas SET estado = 1 WHERE id_cargo = @id;`);
    return result;
  }

  async inactive(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE cargo_citas SET estado = 0 WHERE id_cargo = @id;`);
    return result;
  }
}
