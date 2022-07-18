// NOTE: use this store variable to create a store.
import { legacy_createStore, applyMiddleware } from "redux";
import { reducer as AppReducer } from "./reducer";
import thunk from "redux-thunk";
import { compose } from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(
  AppReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// NOTE: Do not remove this code,its used for calculating your score, if removed it will give you zero marks
if (window.Cypress) {
  window.store = store;
}
