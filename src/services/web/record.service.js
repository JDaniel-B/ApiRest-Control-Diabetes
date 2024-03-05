import { pool } from "../../database/conection.js";

export class recordService {
  constructor() {
    this.pool = pool;
  }

  async find() {
    const { recordset } = await this.pool
      .request()
      .query(`SELECT * FROM expediente`);
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
      .input("idPatiet", data.idPatiet)
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
      .input("idPatiet", data.idPatiet)
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
}
