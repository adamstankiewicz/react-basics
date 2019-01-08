// Component Basics

/**
 * React components let you split the UI into independent, 
 * reusable pieces, and think about each piece in isolation.
 * 
 * Conceptually, components are like JavaScript functions, except they
 * return React elements describing what should appear on the screen.
 * 
 * There are a couple ways to define a React component:
 *  - Function components
 *  - Class components
 * 
 * Note: Always start component names with a capital letter.
 */

/**
 * Function components
 *
 * These are literally just JavaScript functions.
 */
function HelloWorld() {
  return <h1>Hello, World!</h1>;
}

/**
 * Class components
 *
 * You can also use ES6 classes to define a component. The below `HelloWorld`
 * component is equivalent to the `HelloWorld` function component from React's
 * point of view.
 */
class HelloWorld extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

/**
 * Composing Components
 *
 * Components can refer to other components in their children.
 */
function App() {
  return (
    <div>
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
    </div>
  );
}

/**
 * Props (or "properties")
 * 
 * Components accept a single "props" argument with data. Props can be 
 * used to pass data into a component from a parent component.
 * 
 * Note: Props should never be changed within a component!
 */
function Welcome(props) {
  return (
    <h1>
      Hello, {props.user.first} {props.user.last}!
    </h1>
  );
}

function App() {
  const user = {
    first: 'John',
    last: 'Doe',
  };

  return (
    <Welcome user={user} />
  );
}

/**
 * Extracting Components
 * 
 * Be mindful about the size of React components. Are there ways to split
 * a large component into smaller components?
 * 
 * For example, the following `Comment` component can be broken into several smaller
 * components, where each one is isolated.
 */
function Comment(props) {
  return (
    <div className="comment">
      <div className="user-info">
        <img className="avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="user-info-name">
          {props.author.name}
        </div>
      </div>
      <div className="comment-text">
        {props.text}
      </div>
      <div className="comment-date">
        {props.date}
      </div>
    </div>
  );
}

// First, we can extract the avatar and user info into 
// their own components.
function Avatar(props) {
  return (
    <img className="avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}

function UserInfo(props) {
  return (
    <div className="user-info">
      <Avatar user={props.user} />
      <div className="user-info-name">
        {props.user.name}
      </div>
    </div>
  );
}

// With these smaller and more isolated components, we can refactor
// our `Comment` component to use the newly created components.
function Comment(props) {
  return (
    <div className="comment">
      <UserInfo user={props.author} />
      <div className="comment-text">
        {props.text}
      </div>
      <div className="comment-date">
        {props.date}
      </div>
    </div>
  );
}

// By splitting a larger component into smaller pieces, we can create
// isolated components that do not need to know about the context in which
// they are used!

/**
 * Component State
 * 
 * We learned above that components can accept `props`, or data passed to
 * a component. However, `props` are not mutable. If a component needs to
 * update properties, we can use `state`.
 * 
 * `state` is similar to `props`, but it is private and fully controlled
 * by the component itself. Whenever a component's `state` or `props` are
 * changed, the component is updated and rerendered in the DOM.
 * 
 * Note: `state` is a feature only available to ES6 class components!
 */

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }

  render() {
    return (
      <h1>{this.state.counter}</h1>
    );
  }
}

/**
 * Using State Correctly
 */

// Do Not Modify State Directly:

// wrong
this.state.counter = 1;

// right
this.setState({ counter: 1 });

// State Updates May Be Asynchronous:
// 
// Behind the scenes, React batches multiple `setState` calls in
// a single update to be more performant. However, this means that
// sometimes state is not updated immediately. If you need to do something
// after the state has actually been set, you can use a callback.

this.setState({
  counter: 1,
}, () => {
  // Do something here! `counter` state has been set.
})

 
// State Updates are Merged:
// 
// When you use `setState`, React shallow merges your object
// into the current state. That way, you only update the specific
// `state` you want to.
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
    };
  }

  addPost(post) {
    // Leaves this.state.comments intact, and only updates this.state.posts!
    this.setState({
      posts: [...this.state.posts, post],
    });
  }

  addComment(comment) {
    // Leaves this.state.posts intact, and only updates this.state.comments!
    this.setState({
      comment: [...this.state.comments, comment],
    });
  }
}

/**
 * Handling Events
 * 
 * Handling events with React elements is similar to handling events
 * on DOM elements. However, events are named using camelCase, rather than
 * lowercase. Also, with JSX, you pass a function as the event handler, rather
 * than a string.
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }

  add() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  subtract() {
    this.setState({
      counter: this.state.counter - 1,
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.counter}</p>
        <button onClick={this.add}>
          Add
        </button>
        <button onClick={this.subtract}>
          Subtract
        </button>
      </div>
    );
  }
}

/**
 * Lifecycle Methods
 * 
 * On ES6 class components, React has several built-in lifecycle methods. These 
 * can be used to perform things at specific times, e.g. after a component's
 * `props` or `state` has updated.
 */
 class LifecycleMethods extends React.Component {
  constructor(props) {
    // This is called right away!
    super(props);

    // If you don’t initialize state or bind methods, you don’t
    // need to implement a constructor.

    // Avoid copying props into state!
    this.state = {
      name: props.name, // don't do this! 
    };
  }

  componentDidMount() {
    // This is called when a component is mounted into the DOM tree.

    // Initialization that requires DOM nodes or making requests to a remote
    // endpoint should go here!
  }

  componentDidUpdate(prevProps, prevState) {
    // This is called immediately after either `props` or `state` changes.

    // You can access the previous `props` or `state` here, and perform actions
    // when something changes. For example:
    if (this.props.userId !== prevProps.userId) {
      // Fetch new data when `userId` changes.
      this.fetchData(this.props.userId); 
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Use this method to determine if a component's output is going to
    // change by the current change in `state` or `props`.

    // By default, React rerenders components on every `state` or `prop`
    // change, but in some cases you may want to prevent that as a
    // performance optimization. To do so, this function should return 
    // `false` in those cases.
  }

  componentWillUnmount() {
    // This is called immediately before the component is unmounted/destroyed
    // (i.e., removed from the DOM tree).

    // Here, you can perform cleanup actions, such as cancelling requests
    // or invalidating timers.
  }

  render() {
    // Represents what should be rendered in the UI!
  }
}
