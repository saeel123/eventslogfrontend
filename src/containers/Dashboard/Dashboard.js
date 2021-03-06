import React, { Component } from 'react';
import './Dashboard.css';

import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

import { connect } from 'react-redux';
import * as actionsCreators from  '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';
import ReactPaginate from 'react-paginate';

import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';

class Dashboard extends Component {
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

            if(this.props.events.length === 0){
                events = <Alert  variant={'danger'}>
                                   No Events Found.Reset filter.
                        </Alert>
            }
        }

        return (
            <div>
                 <Navigation/>
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
                <footer className={'footer mt-auto py-3'}>
                    <address>
                        Developed By <a href="mailto:saeelmacman123@gmail.com">Saeel Parulekar</a>
                        </address>
                </footer>
            </div>

            
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