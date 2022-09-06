import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from "redux-logger";
import rootReducer from "./reducer";


const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(logger)
  // other store enhancers if any
)

export default createStore(rootReducer, composedEnhancer);