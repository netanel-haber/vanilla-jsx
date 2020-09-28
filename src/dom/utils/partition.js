export const partition = (arr, predicate) => arr.reduce((acc, cur) => {
  acc[Number(!predicate(cur))].push(cur);
  return acc;
}, [[], []]);