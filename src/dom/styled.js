import { css, cx } from 'emotion';
import { assertElementTypeExists } from './utils/assertions';
import wrapInArray from './utils/wrapInArray';
import dom from './dom';

const styledHOC = (Comp) => {
  if (typeof Comp !== "function" && typeof Comp !== "string")
    throw new Error(`Invalid component type ${Comp}`);
  typeof Comp === "string" && assertElementTypeExists(Comp);

  return (strings, interpolations) => {
    return ({ children, ...props }) => dom(
      Comp,
      addClassnameToProps(props, css(strings, mapFunctionInterpolationsToStrings(interpolations, props))),
      children
    )
  }
};

export default new Proxy(styledHOC, {
  get(t, name) {
    return styledHOC(name);
  }
})

const mapFunctionInterpolationsToStrings = (interpolations, props) => wrapInArray(interpolations)
  .map(inter => (typeof inter === "function" ? inter(props) : inter));


const addClassnameToProps = (props, className) => ({
  ...props,
  className: cx(props.className, className)
});
