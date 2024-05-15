import { pool } from "../../database/conection.js";

export class patientService {
  constructor() {
    this.pool = pool;
  }

  async create(data, passwordHash) {
    const result = await this.pool
      .request()
      .input("CUI", data.CUI)
      .input("name", data.name)
      .input("direction", data.direction)
      .input("phone", data.phone)
      .input("email", data.email)
      .input("password", passwordHash)
      .input("status", 1)
      .query(
        `INSERT INTO paciente (CUI, nombre, direccion, telefono, email, password, estado) VALUES (@CUI, @name, @direction, @phone, @email, @password, @status)`
      );
    return result;
  }

  async select() {
    const { recordset } = await this.pool
      .request()
      .query(
        `SELECT id_paciente AS id, CUI, nombre, direccion, telefono, email FROM paciente WHERE estado = 1`
      );
    return recordset;
  }

  async find() {
    const { recordset } = await this.pool
      .request()
      .query(
        `SELECT id_paciente, CUI, nombre, direccion, telefono, email, estado FROM paciente`
      );
    return recordset;
  }

  async findOne(id) {
    const { recordset } = await this.pool
      .request()
      .input("id", id)
      .query(
        `SELECT CUI, nombre, direccion, telefono, email, estado FROM paciente WHERE id_paciente = @id`
      );
    return recordset;
  }

  async findExisting(data) {
    const { recordset } = await this.pool
      .request()
      .input("email", data.email)
      .input("CUI", data.CUI)
      .input("phone", data.phone)
      .query(
        `SELECT * FROM paciente WHERE email = @email OR CUI = @CUI OR telefono = @phone`
      );
    return recordset;
  }

  async update(data, passwordHash, id) {
    const result = await this.pool
      .request()
      .input("CUI", data.CUI)
      .input("name", data.name)
      .input("direction", data.direction)
      .input("phone", data.phone)
      .input("email", data.email)
      .input("password", passwordHash)
      .input("id", id)
      .query(
        `UPDATE paciente SET CUI = COALESCE(@CUI, CUI), nombre = COALESCE(@name, nombre), direccion = COALESCE(@direction, direccion), telefono = COALESCE(@phone, telefono), email = COALESCE(@email, email), password = COALESCE(@password, password) WHERE id_paciente = @id;`
      );
    return result;
  }

  async active(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE paciente SET estado = 1 WHERE id_paciente = @id;`);
    return result;
  }

  async inactive(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE paciente SET estado = 0 WHERE id_paciente = @id;`);
    return result;
  }
}
