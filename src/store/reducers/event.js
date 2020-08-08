import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    events: [],
    loading: false,
    resultCount: null,
    totalCount: null,
    pages: 0,
    limit: null,
}

const fetchEventsStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
}

const fetchEventsrSuccess = (state, action) => {
    return updateObject(state, {
        events: action.events,
        loading: false,
        resultCount: action.resultCount,
        totalCount: action.totalCount,
        pages: action.resultCount/action.limit,
        limit: action.limit
    });
}

const fetchEventsFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_EVENTS_START: return fetchEventsStart(state, action);
        case actionTypes.FETCH_EVENTS_SUCCESS: return fetchEventsrSuccess(state, action);
        case actionTypes.FETCH_EVENTS_FAIL: return fetchEventsFailed(state, action);
        default: return state;
    }
}

export default reducer;