export function formatCentsToReal(cents: number): string {
  const valueInReal = cents / 100;
  const formatador = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatador.format(valueInReal);
}

export const formatRealToCents = (formattedValue: string): number => {
  const sanitizedValue = String(formattedValue).replace(/[^0-9]/g, "");
  const intValue = parseInt(sanitizedValue, 10);
  return intValue;
};
