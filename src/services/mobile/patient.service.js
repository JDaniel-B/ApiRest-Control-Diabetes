import { pool } from "../../database/conection.js";

export class patientService{
  constructor(){
    this.pool = pool
  }

  async findOne(id) {
    const { recordset } = await this.pool
      .request()
      .input("id", id)
      .query(
        `SELECT id_paciente, CUI, nombre, direccion, telefono, email, estado FROM paciente WHERE id_paciente = @id`
      );
    return recordset;
  }
}