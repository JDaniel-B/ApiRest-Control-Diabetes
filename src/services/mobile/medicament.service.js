import { pool } from "../../database/conection.js";

export class medicamentService {
  constructor() {
    this.pool = pool;
  }

  async getMedicament(id) {
    const { recordset } = await this.pool.request().input("id", id)
      .query(`SELECT C.id_cargo, C.nombre_medicamento, C.no_dias, C.cada_hora, C.fecha, C.recomendaciones, U.nombre AS doctor, U.telefono FROM cargo_medicamento C
      INNER JOIN expediente E ON C.id_expediente = E.id_expediente
      INNER JOIN usuario U ON E.id_usuario = U.id_usuario
      INNER JOIN paciente P ON E.id_paciente = P.id_paciente
      WHERE P.id_paciente = @id`);
    return recordset;
  }
}
