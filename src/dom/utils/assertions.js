import { isValidEventType } from "./eventTypes";

const elementCache = {};
export const assertElementTypeExists = (el) => {
  if (typeof el === "string")
    el = elementCache[el] || (elementCache[el] = document.createElement(el))

  if (el.toString() === "[object HTMLUnknownElement]")
    throw new Error(`Non Existant Element ${el}`);
}


export const assertValidEventType = (type) => {
  if (!isValidEventType(type))
    throw new Error(`Invalid Event Type ${type}`);
}


export const assertValidAttribute = (obj, propName) => {
  if (!propName in obj)
    throw new Error(`Non Existing attribute ${propName} on ${obj}`);
}