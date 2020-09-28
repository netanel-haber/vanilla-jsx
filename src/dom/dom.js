import { assertElementTypeExists, assertValidAttribute, assertValidEventType } from './utils/assertions';
import { partition } from './utils/partition';


export default function jsx(elementType, props, ...children) {
  props = props || {};

  if (typeof elementType === "function")
    return elementType({ ...props, children });

  const el = document.createElement(elementType);
  assertElementTypeExists(el);

  const [eventHandlerEntries, nonEventHandlersEntries] = separateEventHandlersFromNonEventHandlers(props);
  attachEventHandlers(el, eventHandlerEntries);
  attachEventListenerCleanupFunc(el, eventHandlerEntries, children);


  const { style = {}, ...rest } = Object.fromEntries(nonEventHandlersEntries);
  iterateOverPropertiesAndAddThemToObject(el, rest);
  iterateOverPropertiesAndAddThemToObject(el.style, style);

  addChildren(el, children);

  return el;
}




function attachEventHandlers(el, eventHandlerEntries) {
  eventHandlerEntries.forEach(([eventType, handler]) => el.addEventListener(eventType, handler))
}


function attachEventListenerCleanupFunc(el, eventHandlerEntries, children) {
  if (!eventHandlerEntries.length && !children.length)
    return;
  el.cleanup = () => {
    eventHandlerEntries.forEach(([eventType, handler]) => {
      el.removeEventListener(eventType, handler);
    })
    Array.from(el.children).forEach(child => {
      if (child.cleanup)
        child.cleanup();
    })
  }
}


const separateEventHandlersFromNonEventHandlers = (props) => partition(Object.entries(props), ([propName, value]) => {
  if (typeof value === "function") {
    assertValidEventType(propName);
    return true;
  }
});


function iterateOverPropertiesAndAddThemToObject(obj, properties) {
  Object.entries(properties).forEach(([propName, value]) => {
    assertValidAttribute(obj, propName);
    obj[propName] = value;
  })
}

function addChildren(el, children) {
  if (Array.isArray(children))
    return children.forEach(child => addChildren(el, child))

  el.appendChild(typeof children === "string"
    ? document.createTextNode(children)
    : children
  );
}