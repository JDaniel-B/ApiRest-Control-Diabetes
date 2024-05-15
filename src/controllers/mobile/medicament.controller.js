
import { medicamentService } from "../../services/mobile/medicament.service.js";

const service = new medicamentService();

const getMedicament = async (req, res, next) => {
  const { id } = req.params;
  try {
    const medicament = await service.getMedicament(id);
    res.send(medicament);
  } catch (error) {
    next(error);
  }
};

export { getMedicament };
