import { pool } from "../../database/conection.js";

export class userService {
  constructor() {
    this.pool = pool;
  }

  async create(data, passwordHash) {
    const result = await this.pool
      .request()
      .input("nombre", data.name)
      .input("telefono", data.phone)
      .input("email", data.email)
      .input("password", passwordHash)
      .input("id_rol", data.rol)
      .input("estado", 1)
      .query(
        `INSERT INTO usuario (nombre, telefono, email, password, id_rol, estado) VALUES (@nombre, @telefono, @email, @password, @id_rol, @estado)`
      );
    return result;
  }

  async select() {
    const { recordset } = await this.pool
      .request()
      .query(
        `SELECT U.id_usuario AS id, U.nombre, U.telefono, U.email FROM usuario U INNER JOIN roles R ON U.id_rol = R.id_rol WHERE U.estado = 1 AND U.id_rol = 2`
      );
    return recordset;
  }

  async getRoles() {
    const { recordset } = await this.pool
      .request()
      .query(`SELECT id_rol AS id, nombre FROM roles`);
    return recordset;
  }

  async find() {
    const { recordset } = await this.pool
      .request()
      .query(
        `SELECT U.id_usuario, U.nombre, U.telefono, U.email, U.estado, R.nombre AS rol FROM usuario U INNER JOIN roles R ON U.id_rol = R.id_rol`
      );
    return recordset;
  }

  async findExisting(data) {
    const { recordset } = await this.pool
      .request()
      .input("email", data.email)
      .input("phone", data.phone)
      .query(
        `SELECT * FROM usuario WHERE email = @email OR telefono = @phone`
      );
    return recordset;
  }

  async findOne(id) {
    const { recordset } = await this.pool
      .request()
      .input("id", id)
      .query(
        `SELECT U.id_usuario, U.nombre, U.telefono, U.email, U.estado, R.nombre AS rol FROM usuario U INNER JOIN roles R ON U.id_rol = R.id_rol WHERE U.id_usuario = @id`
      );
    return recordset;
  }

  async update(data, passwordHash, id) {
    const result = await this.pool
      .request()
      .input("name", data.name)
      .input("phone", data.phone)
      .input("email", data.email)
      .input("password", passwordHash)
      .input("rol", data.rol)
      .input("id", id)
      .query(
        `UPDATE usuario SET nombre = COALESCE(@name, nombre), telefono = COALESCE(@phone, telefono), email = COALESCE(@email, email), password = COALESCE(@password, password), id_rol = COALESCE(@rol, id_rol) WHERE id_usuario = @id;`
      );
    return result;
  }

  async activeUser(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE usuario SET estado = 1 WHERE id_usuario = @id;`);
    return result;
  }

  async inactiveUser(id) {
    const result = await this.pool
      .request()
      .input("id", id)
      .query(`UPDATE usuario SET estado = 0 WHERE id_usuario = @id;`);
    return result;
  }

  async recoveryPassword(id, passwordHash) {
    const result = await this.pool
      .request()
      .input("id", id)
      .input("password", passwordHash)
      .query(`UPDATE usuario SET password = @password WHERE id_usuario = @id;`);
    return result;
  }
}
