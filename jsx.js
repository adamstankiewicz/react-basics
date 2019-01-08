// JSX Basics

/*
 * JSX is a JavaScript extension. Similar to a template language, but 
 * with the full power of JavaScript.
 * 
 * JSX elements are compiled to React "elements" (or, `React.createElement()`), 
 * which represent JavaScript objects. React uses these objects to construct
 * the DOM.
 */ 
const element = <h1>Hello, world!</h1>;

/* Embedding Expressions in JSX
 *
 * You can put any JavaScript expression inside the curly braces
 * in JSX.
 */
function formatName({ first, last }) {
  return `${first} ${last}`
}

const element = (
  <h1>
    Hello, {formatName({ first: 'John', last: 'Doe' })}!
  </h1>
);

/*
 * Specifying Attributes with JSX
 * 
 * Attributes can be string literals or curly braces to
 * embed a JavaScript expression in an attribute.
 */
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;

/*
 * Specifying Children with JSX
 */
const element = (
  <div>
    <h1>Mmm, pizza!</h1>
    <p>🍕🍕🍕</p>
  </div>
);
