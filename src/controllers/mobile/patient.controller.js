import { patientService } from "../../services/mobile/patient.service.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const { SECRET_TOKEN } = process.env;
const service = new patientService();

const getMe = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwt.decode(`${token}`, SECRET_TOKEN);
  try {
    const patient = await service.findOne(decoded?.id_patient);
    res.send(patient);
  } catch (error) {
    next(error);
  }
};

export { getMe };
