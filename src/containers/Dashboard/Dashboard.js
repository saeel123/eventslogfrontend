import React, { Component } from 'react';
import Classes from './Dashboard.module.css';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';
import * as actionsCreators from  '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

class Dashboard extends Component {
    componentDidMount() {
        this.props.onFetchEvents(1, 20);
    }

    render() {
        let events = <Spinner />;
        if ( !this.props.loading ) {
            let dataevents = this.props.events.map( order => (
                <tr key={order._id}>         
                    <td>{order.subject}</td>
                    <td>{order.message}</td>
                    <td>{order.author}</td>
                    <td>{order.event_created_at}</td>
                    <td>{order.verb}</td>
                </tr>
            ))

            events =    <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Subject Type</th>
                                    <th>Message</th>
                                    <th>Author</th>
                                    <th>Created At</th>
                                    <th>Verb</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataevents}
                            </tbody>
                        </Table>
        }

        return (
            <Container>
                <Row>
                    {events}
                </Row>
            </Container>
            
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