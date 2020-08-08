import * as actionTypes from './actionsTypes';
import axios from '../../axios-events'


export const fetchEventsSuccess = (events, resultCount, totalCount, limit) => {
    return {
        type: actionTypes.FETCH_EVENTS_SUCCESS,
        events:events,
        resultCount: resultCount,
        totalCount: totalCount,
        limit: limit
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

        dispatch(fetchEventsStart());

        const searchString = localStorage.getItem('searchString');
        const toDateTime = localStorage.getItem('toDateTime');
        const fromDateTime = localStorage.getItem('fromDateTime');

        console.log(searchString);
        console.log(toDateTime);
        console.log(fromDateTime);

        const queryParams = '?limit=' + limit + '&page=' + page + '&sortBy=event_created_at:desc'
            axios.get('/event'+queryParams).then(response => {    
            const fetchEvents = response.data.data;
            const resultCount = response.data.count;
            const totalCount = response.data.total_count;
            dispatch(fetchEventsSuccess(fetchEvents, resultCount, totalCount, limit ));
        }).catch(error => {
            dispatch(fetchEventsFail(error));
        })
    }
}