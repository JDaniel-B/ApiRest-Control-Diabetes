export function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      return res.send({
        error: false,
        isValid: false,
        message: "Los Datos No Son Validos",
      });
    } else {
      return next();
    }
  };
}
