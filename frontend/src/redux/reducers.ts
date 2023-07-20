// reducers.ts
import { combineReducers } from 'redux';
import { CO2ActionTypes, CO2State, UPDATE_CO2 } from './types';

const initialState: CO2State = {
    co2Values: [], // Initialize co2Values as an empty array
};

const co2Reducer = (state = initialState, action: CO2ActionTypes): CO2State => {
    switch (action.type) {
        case UPDATE_CO2:
            return {
                ...state,
                co2Values: [...state.co2Values, action.payload], // Append the new CO2 value to the array
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    co2: co2Reducer,
});

export default rootReducer;
