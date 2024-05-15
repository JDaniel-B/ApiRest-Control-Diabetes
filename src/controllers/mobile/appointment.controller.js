import { appointmentService } from "../../services/mobile/appointment.service.js";

const service = new appointmentService();

const header = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointment = await service.header(id);
    res.send(appointment);
  } catch (error) {
    next(error);
  }
};

const detail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointment = await service.detail(id);
    res.send(appointment);
  } catch (error) {
    next(error);
  }
};

export { header, detail };
