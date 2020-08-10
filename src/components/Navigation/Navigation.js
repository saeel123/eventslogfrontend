import React , { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import * as actionsCreators from  '../../store/actions/index';

class Navigation extends Component {

    
    syncEventsHandler = (event) => {
        event.preventDefault();
        this.props.onSyncEvents();
    }



    render(){
        return (
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Event Logger</Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                    <Form inline>
                        <Button variant="outline-info" onClick={this.syncEventsHandler}>Sync Events</Button>
                    </Form>
                </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.event.events,
        resultCount: state.event.resultCount,
        totalCount: state.event.totalCount,
        loading: state.event.loading,
        pages: state.event.pages,
        limit: state.event.limit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSyncEvents: () => dispatch(actionsCreators.syncEvents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);