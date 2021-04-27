import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducer/dataReducer";

const reducer = combineReducers({
  data: dataReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
