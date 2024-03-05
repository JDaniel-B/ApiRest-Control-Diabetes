import { pool } from "../../database/conection.js";

export class chargeAppointmentService {
  constructor() {
    this.pool = pool;
  }

  async find() {
    const { recordset } = await this.pool.request()
      .query(`SELECT P.nombre, P.email, P.telefono, D.descripcion, C.fecha, C.estado FROM cargo_citas C 
      INNER JOIN expediente E ON C.id_expediente = E.id_paciente 
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes;`);
    return recordset;
  }

  async findOne(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT P.nombre, P.email, P.telefono, D.descripcion, C.fecha, C.estado FROM cargo_citas C 
      INNER JOIN expediente E ON C.id_expediente = E.id_paciente 
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
        `INSERT INTO cargo_citas (id_expediente, fecha, estado) VALUES (@idRecord, @date, @status)`
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
