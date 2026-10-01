export const Formatter = {
  number(value: string) {
    return value.replace(/\D/g, "");
  },
  cep: (value: string) => {
    const digits = value.replace(/\D/g, "");

    const limit = digits.slice(0, 8);

    if (limit.length <= 5) return limit;

    return limit.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  },
  cpf(value: string) {
    const digits = value.replace(/\D/g, "");

    const limit = digits.slice(0, 11);

    if (limit.length <= 3) return limit;
    if (limit.length <= 6) return limit.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    if (limit.length <= 9)
      return limit.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");

    return limit.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  },
  cnpj(value: string) {
    const digits = value.replace(/\D/g, "");

    const limit = digits.slice(0, 14);

    if (limit.length <= 2) return limit;
    if (limit.length <= 6) return limit.replace(/(\d{2})(\d{1,3})/, "$1.$2");
    if (limit.length <= 9)
      return limit.replace(/(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3");
    if (limit.length <= 12)
      return limit.replace(/(\d{2})(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3/$4");
    if (limit.length <= 14)
      return limit.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/,
        "$1.$2.$3/$4-$5"
      );

    return limit;
  },

  phone: (value: string) => {
    const digits = value.replace(/\D/g, "");

    const limit = digits.slice(0, 11);

    if (limit.length <= 2) return limit;
    if (limit.length <= 6) return limit.replace(/(\d{2})(\d{1,4})/, "($1) $2");

    return limit.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
  },

  date: (value: string) => {
    const digits = value.replace(/\D/g, "");

    const limit = digits.slice(0, 8);

    if (limit.length <= 2) return limit;
    if (limit.length <= 4) return limit.replace(/(\d{2})(\d{1,2})/, "$1/$2");

    return limit.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
  },
};
