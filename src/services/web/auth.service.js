import { pool } from "../../database/conection.js";

export class authService {
  constructor() {
    this.pool = pool;
  }

  async login(email) {
    const { recordset } = await this.pool
      .request()
      .input("email", email)
      .query("SELECT * FROM usuario WHERE email = @email");
    return recordset;
  }
}
