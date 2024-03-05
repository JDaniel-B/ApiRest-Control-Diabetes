export const generatePassword = () => {
  const longitud = 12;
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";

  while (password.length < longitud) {
    const caracterAleatorio =
      caracteres[Math.floor(Math.random() * caracteres.length)];
    password += caracterAleatorio;
  }

  return password;
};