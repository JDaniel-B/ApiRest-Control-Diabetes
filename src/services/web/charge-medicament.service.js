import { pool } from "../../database/conection.js";

export class chargeMedicamentService {
  constructor() {
    this.pool = pool;
  }

  async find() {
    const { recordset } = await this.pool.request()
      .query(`SELECT C.id_cargo, P.nombre AS paciente, P.telefono, D.descripcion, C.nombre_medicamento AS medicamento, C.no_dias, C.cada_hora, C.fecha, U.nombre AS usuario, C.estado FROM cargo_medicamento C 
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente 
      INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes;`);
    return recordset;
  }

  async findByUser(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT C.id_cargo, P.nombre AS paciente, P.telefono, D.descripcion, C.nombre_medicamento AS medicamento, C.no_dias, C.cada_hora, C.fecha, U.nombre AS usuario, C.estado FROM cargo_medicamento C 
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
      .input("name", data.name)
      .input("days", data.days)
      .input("hour", data.hour)
      .input("recommendations", data.recommendations)
      .input("date", data.date)
      .input("inicio", "")
      .input("status", 1)
      .query(
        `INSERT INTO cargo_medicamento (id_expediente, nombre_medicamento, no_dias, cada_hora, recomendaciones, fecha, inicio, estado) VALUES (@idRecord, @name, @days, @hour, @recommendations, CAST(@date AS date), @inicio, @status)`
      );
    return result;
  }

  async update(data, id) {
    const result = await this.pool
      .request()
      .input("date", data.date)
      .input("id", id)
      .query(
        `UPDATE cargo_medicamento SET fecha = COALESCE(@date, fecha) WHERE id_cargo = @id;`
      );
    return result;
  }

  async active(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE cargo_medicamento SET estado = 1 WHERE id_cargo = @id;`);
    return result;
  }

  async inactive(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE cargo_medicamento SET estado = 0 WHERE id_cargo = @id;`);
    return result;
  }
}
