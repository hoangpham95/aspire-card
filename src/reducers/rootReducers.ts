import {combineReducers} from 'redux';
import accountReducers from './accountReducer';

const rootReducer = combineReducers({
  accountState: accountReducers,
});

export default rootReducer;
