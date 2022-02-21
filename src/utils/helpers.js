export const filterFromArray = (
  // Function to filter items from array based on passed conditions
  obj, // Array Object containing all elements
  keylabel, // Item Key to check, this could be nested if the nest parameter below is not null, ie has the label of the nested array
  possible_values, //// possible values of the item key above, this could be an array or string
  nest = null //If this is passed, it should be the key value of the nested array from the parent array
) => {
  let obje = Object.values(obj);
  let result = obje.filter(function (el) {
    if (Array.isArray(possible_values)) {
      // if the possible values were passed as an array
      return (
        possible_values.includes(el[keylabel]) === possible_values ||
        (nest && possible_values.includes(el[nest][keylabel]))
      );
    } else {
      // if the possible value is a string
      return (
        el[keylabel] === possible_values ||
        (nest && el[nest][keylabel] === possible_values)
      );
    }
  });
  return result;
};
