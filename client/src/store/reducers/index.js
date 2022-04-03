import { combineReducers } from 'redux';
import hospitalReducer from './hospital.reducer';
import globalReducer from './global.reducer';

const reducer = combineReducers({
  hospitalReducer,
  globalReducer
});

export default reducer;