# Problems

### Using event listeners in React components

### Setting up codecov with circle.ci

**Problem**: permission denied with Python `pip install`
**Solution**: prepend with `sudo`

### Setting up Redux Thunk
**Problem**: Redux state shows up as undefined once middleware with redux thunk has been applied

There were several problems afoot here:

1. After combining reducers, we were accessing the state incorrectly.
```js
const mapStateToProps = (state) => {
    return {
        eventDetails: state.eventDetails
    };
};
```
**Solution**
This needs to be:
```js
const mapStateToProps = (state) => {
    return {
        eventDetails: state.createEvent.eventDetails
    };
};
```

2. Our configuration of Redux DevTools were causing problems.

Error message:
```
The previous state received by the reducer has unexpected type of "Function". Expected argument to be an object with the following keys: "createEvent"
```

This is how we had originally set up our `createStore`:
```js
export default function initStore () {

    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );
}
```
`createStore` only requires the first argument, the reducer.  The following are possible:

```js
createStore(myReducer);
createStore(myReducer, [myInitialState]);
createStore(myReducer, [myInitialState], [myMiddleware]);
createStore(myReducer, [myMiddleware]);
```

But we were doing:
```js
createStore(myReducer, [myThunkMiddleware], [myDevTools]);
```

By passing the Redux DevTools configuration as a third argument, `createStore` assumed our second argument was our initial state.  Hence the error message.


**Solution**

Use `compose` to string together the thunk middleware and the DevTools.

Rather embarrassingly, this was clearly demonstrated in the docs for [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) and [Redux itself](http://redux.js.org/docs/api/compose.html)

### Error running tests after resolving Thunk problem

**Problem**
* TypeError thrown when running tests - no tests were able to run.
* Error originated from the `compose` function inside `createStore`
```bash
TypeError: Cannot read property 'apply' of undefined
```
**Solution**
The `undefined` in the test error was coming from the DevTools configuration:
```js
return createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
);
```
This changes to:
```js
return createStore(
    rootReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
```
### Could not add new inputs
**Problem**
* Updated state did not cascade down from smart component to lower levels.
* Originally only affecting `eventWhen`, then after some tidying up started to affect all other create-event views...

**Solution**
Something to do with the way state was being updated.

Relates to [issue #40](https://github.com/DRDD2016/app/issues/40)

### Could not make request to Facebook
**Problem**
```bash
XMLHttpRequest cannot load https://www.facebook.com/v2.3/dialog/oauth?client_id=612765462219386&respon…EwB2ibLlwghFkdtedcVxS&scope=user_friends%2Cuser_about_me%2Cpublish_actions. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
```

**Solution**
* Decided to do facebook authentication outside of app.
* Login button has a direct link to server endpoint, rather than making a `GET` request with axios.


### Conditionally rendering the correct view after authenticated
**Problem**
* When using `window.location = '/feed'`, the login page was visible for a split second

**Solution**
* Can use react-router to handle redirecting, which does it much more smoothly.
* Created a higher-order component to conditionally render a given component, depending on auth state.
* Was inspired by [react-redux-jwt-auth-example](https://github.com/joshgeller/react-redux-jwt-auth-example)
```js

if (document.cookie.indexOf("sparkID") !== -1) {

    this.context.router.push('/feed');
    return false;
}
...
...
/* Outside of the component class*/
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Login;
```

### Update 29/5/2016
* browserHistory is preferred over hashHistory in react router.
Now using:
```js
browserHistory.push('/feed');
```

### Getting Facebook photo

**Problem**

Getting an `[SyntaxError] Unexpected token`

**Solution**
* Facebook api will redirect you to the image by default.
* Add `?redirect=false` to the end of the url to prevent this.

## Testing
### Mounting components using `renderIntoDocument`

**Problem**
Code snippet from test:
```js
const store = initStore(initialState);
const renderedApp = TestUtils.renderIntoDocument(<AppContainer />);
```
```bash
Invariant Violation: Could not find "store" in either the context or props of "Connect(App)". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(App)".
```

**Solution**
* By rendering AppContainer like this, the normal props that get pass down when the app runs are not all there.
* In this case, the Redux `store` was missing.  Passing it down manually works.
```js
const store = initStore(initialState);
const renderedApp = TestUtils.renderIntoDocument(<AppContainer store={store} />);
```

### Hanging tests
**Problem**
Tests that would involve database work would hang.

**Solution**
Remember to quit Redis client in **all** redis functions with:
```js
client.quit();
```

### Tests and cookies
**Problem**
* After using regex to obtain cookie, got error
```bash
Cannot get property [0] of null
```
* This is because there was no cookie in the test envirionment.  
* Previously, the cookie would have been `undefined` and slipped through unnoticed.

**Solution**
* Configure jsdom to hold a fake cookie.
```js
import jsdom from 'jsdom';

const options = {
    cookie: "sparkID=12345678; path=/"
};

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', options);
/* ... rest of code */
```
### Socket.io and Testing
**Problem**
* Tests Hanging

**Solution**
* Client-side socket was not disconnecting.  Running the following closed the client socket:
```js
socket.disconnect();
```
