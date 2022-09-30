export const findPropertyUtil = (people, keyValues) => {
    return keyValues.reduce(
      (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
      people
    );
  };

 export const capitalizeUtil = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  