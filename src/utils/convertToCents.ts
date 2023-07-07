export const convertToCents = (formattedValue: string) => {
  const sanitizedValue = formattedValue.replace(/[^0-9]/g, "");
  const intValue = parseInt(sanitizedValue, 10);
  return intValue;
};
