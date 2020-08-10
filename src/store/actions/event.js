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

        let searchString = localStorage.getItem('searchString');
        let toDateTime = localStorage.getItem('toDateTime');
        let fromDateTime = localStorage.getItem('fromDateTime');

        if (!searchString) {
            searchString = ''
        }

        if (toDateTime) {
            toDateTime = new Date(toDateTime).getTime() / 1000;
        }else {
            toDateTime = ''
        }

        if (fromDateTime) {
            fromDateTime = new Date(fromDateTime).getTime() / 1000;
        }else {
            fromDateTime = ''
        }

        const queryParams = '?limit=' + limit + '&page=' + page + '&sortBy=event_created_at:desc&startDate='+ fromDateTime +'&endDate='+ toDateTime +'&message='+searchString
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


export const syncEvents = () => {
    return dispatch => {
        axios.get('/syncevent').then(response => {    
            dispatch(fetchEvents(1, 10));
        }).catch(error => {
            dispatch(fetchEventsFail(error));
        })
    }
}