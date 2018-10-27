import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app/appContainer';
import appReducer from './components/app/reducer';

const epicMiddleware = createEpicMiddleware();
const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const composeEnhancers = composeWithDevTools({});
const mainStore = createStore(
  connectRouter(history)(combineReducers({
    app: appReducer,
    // Add reducers here
  })),
  // preloadedState (ifExists),
  composeEnhancers(applyMiddleware(epicMiddleware, routeMiddleware))
);

epicMiddleware.run(combineEpics(
  // Epics for each connected component here
));

class Root extends React.Component<{ store: Store }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

render(
  <Root store={mainStore} />,
  document.getElementById('app')
);
