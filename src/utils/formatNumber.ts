export const formatNumber = (num: number): string => {
  if (num === null || num === undefined) {
    return "";
  }

  const number = Number(num);

  if (isNaN(number)) {
    return String(num);
  }

  if (number < 1000) {
    return String(number);
  } else if (number < 1_000_000) {
    const formatted = (number / 1000).toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + "K"
      : formatted + "K";
  } else if (number < 1_000_000_000) {
    const formatted = (number / 1_000_000).toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + "M"
      : formatted + "M";
  } else {
    const formatted = (number / 1_000_000_000).toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + "B"
      : formatted + "B";
  }
};
