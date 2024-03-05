import { config } from "dotenv";

config();

export const validatorApiKey = (req, res, next) => {
  const apiKey = req.header("apiKey");
  if (apiKey !== process.env.API_KEY) {
    res.status(404).send("NO ACCESS");
  } else {
    next();
  }
};
