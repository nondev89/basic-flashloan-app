import web3WrapperReducer from './web3wrapper';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    web3Wrapper: web3WrapperReducer
});

export default rootReducer;