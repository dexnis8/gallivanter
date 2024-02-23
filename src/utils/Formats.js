/* eslint-disable no-unused-vars */
export const formatString = (str, formatLen) => {
  const formatted =
    str?.length > formatLen ? str.slice(0, formatLen) + "..." : str;

  return formatted;
};
export function formatDate(inputDate) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
}

export function formatPrice(price) {
  // Convert the price to a string
  const priceString = price?.toString();

  // Split the string into dollars and cents (if applicable)
  const [dollars, cents] = priceString.split(".");

  // Add commas to the dollars part
  const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine dollars and cents (if applicable) and return the formatted price
  const formattedPrice = cents
    ? `${formattedDollars}.${cents}`
    : formattedDollars;

  return formattedPrice;
}

export function formatDateToYYYYMMDD(isoDateString) {
  const date = new Date(isoDateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
