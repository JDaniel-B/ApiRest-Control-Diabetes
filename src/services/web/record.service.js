import { pool } from "../../database/conection.js";

export class recordService {
  constructor() {
    this.pool = pool;
  }

  async find() {
    const { recordset } = await this.pool.request()
      .query(`SELECT E.id_expediente AS id, P.nombre AS paciente, P.telefono, D.descripcion AS diabetes, CONVERT(VARCHAR(10), E.fecha, 101) AS fecha, E.estado, U.nombre AS usuario FROM expediente E
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes`);
    return recordset;
  }

  async findActive() {
    const { recordset } = await this.pool.request()
      .query(`SELECT E.id_expediente AS id, P.nombre AS paciente, P.telefono, D.descripcion AS diabetes, CONVERT(VARCHAR(10), E.fecha, 101) AS fecha, U.nombre AS usuario FROM expediente E
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes
      WHERE E.estado = 1`);
    return recordset;
  }

  async findByUser(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT E.id_expediente AS id, P.nombre AS paciente, P.telefono, D.descripcion AS diabetes, CONVERT(VARCHAR(10), E.fecha, 101) AS fecha, E.estado, U.nombre AS usuario FROM expediente E
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN tipo_diabetes D ON E.id_diabetes = D.id_diabetes
      WHERE U.id_usuario = @id`);
    return recordset;
  }

  async findOne(id) {
    const { recordset } = await this.pool
      .request()
      .input("id", id)
      .query(`SELECT * FROM expediente where id_expediente = @id`);
    return recordset;
  }

  async create(data) {
    const result = await this.pool
      .request()
      .input("idPatiet", data.idPatient)
      .input("idUser", data.idUser)
      .input("idDiabetes", data.idDiabetes)
      .input("date", data.date)
      .input("status", 1)
      .query(
        `INSERT INTO expediente (id_paciente, id_usuario, id_diabetes, fecha, estado) VALUES (@idPatiet, @idUser, @idDiabetes, @date, @status)`
      );
    return result;
  }

  async update(data, id) {
    const result = await this.pool
      .request()
      .input("idPatiet", data.idPatient)
      .input("idUser", data.idUser)
      .input("idDiabetes", data.idDiabetes)
      .input("date", data.date)
      .input("id", id)
      .query(
        `UPDATE expediente SET id_paciente = COALESCE(@idPatiet, id_paciente), id_usuario = COALESCE(@idUser, id_usuario), id_diabetes = COALESCE(@idDiabetes, id_diabetes), fecha = COALESCE(@date, fecha) WHERE id_expediente = @id;`
      );
    return result;
  }

  async active(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE expediente SET estado = 1 WHERE id_expediente = @id;`);
    return result;
  }

  async inactive(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE expediente SET estado = 0 WHERE id_expediente = @id;`);
    return result;
  }

  async validateExist(data) {
    const { recordset } = await this.pool
      .request()
      .input("id", data.idPatient)
      .query(`SELECT * FROM expediente where id_paciente = @id AND estado = 1`);
    return recordset;
  }

  async validateDiabetes(data) {
    const { recordset } = await this.pool
      .request()
      .input("idPatient", data.idPatient)
      .input("idDiabetes", data.idDiabetes)
      .query(
        `SELECT * FROM expediente where id_paciente = @idPatient AND id_diabetes = @idDiabetes AND estado = 1`
      );
    return recordset;
  }

  async replace(data) {
    const result = await this.pool
      .request()
      .input("idPatiet", data.idPatient)
      .input("idUser", data.idUser)
      .input("idDiabetes", data.idDiabetes)
      .input("date", data.date)
      .input("status", 1)
      .query(
        `INSERT INTO expediente (id_paciente, id_usuario, id_diabetes, fecha, estado) VALUES (@idPatiet, @idUser, @idDiabetes, @date, @status)`
      );
    return result;
  }

  async getDiabetes() {
    const { recordset } = await this.pool
      .request()
      .query(
        `SELECT id_diabetes AS id, descripcion AS nombre FROM tipo_diabetes`
      );
    return recordset;
  }
}
