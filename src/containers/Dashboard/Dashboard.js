import React, { Component } from 'react';
import './Dashboard.css';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';
import * as actionsCreators from  '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';
import ReactPaginate from 'react-paginate';

import Search from '../../components/Search/Search';

class Dashboard extends Component {
    state = {
            offset: 0,
            data: [],
            perPage: 10,
    }

    componentDidMount() {
        this.props.onFetchEvents(1, 10);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        this.props.onFetchEvents( selectedPage + 1, 10);
    };

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

            events =<div>
                        <Table striped bordered hover>
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
                    </div>    
        }

        return (
            <Container>
                  <Search/>
                    <div>
                        <Row>
                            {events}
                            <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.props.pages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
                        </Row>
                    </div>
            </Container>
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
        onFetchEvents: (page, limit) => dispatch(actionsCreators.fetchEvents(page, limit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);