import React, { Component } from 'react';
import Classes from './Dashboard.module.css';

import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import * as actionsCreators from  '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

class Dashboard extends Component {
    componentDidMount() {
        this.props.onFetchEvents("page", "limit");
    }

    render() {
        let events = <Spinner />;

        return (
            <div>
                 {events}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        events: state.event.events,
        loading: state.event.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: (page, limit) => dispatch(actionsCreators.fetchEvents(page, limit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);