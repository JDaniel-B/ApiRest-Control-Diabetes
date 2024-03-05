export function logErrors(err, req, res, next) {
  console.error(err.message, err.stack);
  next(err);
}

export function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: true,
    message: "Error interno del servidor",
  });
}
