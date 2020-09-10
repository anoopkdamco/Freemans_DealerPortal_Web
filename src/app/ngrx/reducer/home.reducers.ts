import { Actions } from '@ngrx/effects';
import { IHomeRecord } from "./../../models/IHomeRecord";
import * as homeActions from './../actions/home.actions';
import { Action } from './../actions/home.actions';

export interface HomeState {
  homeRecord: IHomeRecord;
  objectLoading: string;
  errorObject: string;
}

const initialState: HomeState = {
  homeRecord: null,
  objectLoading: "",
  errorObject: ""
};

export function homeReducer(state = initialState, action: Action): HomeState {
    switch (action.type) {
        case homeActions.LOAD_DASHBOARD_RECORD: {
            return {
                ...state,
                homeRecord: null,
                objectLoading: "Home_Load"
            };
        }
        case homeActions.LOAD_DASHBOARD_RECORD_SUCCESS: {
            return {
                ...state,
                homeRecord: action.payload,
                objectLoading: "Home_Records_Success",
                errorObject: null
            };

        }
           
        case homeActions.LOAD_DASHBOARD_RECORD_FAILURE: {
            return {
                ...state,
                homeRecord: null,
                objectLoading: "Home_Records_ERROR",
                errorObject: action.payload
            };
        }
    }
}
