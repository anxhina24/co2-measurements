// Action Types
export const UPDATE_CO2 = 'UPDATE_CO2';

// Action Interfaces
export interface UpdateCO2Action {
    type: typeof UPDATE_CO2;
    payload: number;
}

// Union type for all CO2-related action types.
export type CO2ActionTypes = UpdateCO2Action;

// State Interface
export interface CO2State {
    co2Values: number[];
}

// Action Creator
export const updateCO2 = (co2Value: number): CO2ActionTypes => ({
    type: UPDATE_CO2,
    payload: co2Value,
});
