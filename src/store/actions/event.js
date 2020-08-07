import * as actionTypes from './actionsTypes';
import axios from '../../axios-events'


export const fetchEventsSuccess = (events) => {
    return {
        type: actionTypes.FETCH_EVENTS_SUCCESS,
        events:events
    }
}

export const fetchEventsFail = (error) => {
    return {
        type: actionTypes.FETCH_EVENTS_FAIL,
        error:error
    }
}

export const fetchEventsStart = () => {
    return {
        type: actionTypes.FETCH_EVENTS_START
    }
}

export const fetchEvents = (page, limit) => {
    return dispatch => {
        console.log(page);
        console.log(limit);

        dispatch(fetchEventsStart());
        const queryParams = '?limit=' + limit + '&page=' + page + '&sortBy=event_created_at:desc'
            axios.get('/event'+queryParams).then(response => {
            const fetchEvents = response.data;
            dispatch(fetchEventsSuccess(fetchEvents));
        }).catch(error => {
            dispatch(fetchEventsFail(error));
        })


    }
}